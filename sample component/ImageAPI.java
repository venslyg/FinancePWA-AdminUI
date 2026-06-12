package com.theheavenscode.web.rest;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

import com.googlecode.pngtastic.core.PngImage;
import com.googlecode.pngtastic.core.PngOptimizer;
import com.luciad.imageio.webp.WebPWriteParam;
import com.theheavenscode.service.ImageCompressionService;
import java.awt.Graphics2D;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Security;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.resizers.configurations.Antialiasing;
import net.coobird.thumbnailator.resizers.configurations.ScalingMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/image")
public class ImageAPI {

    private String uploadPath = "image";

    @Autowired
    ImageCompressionService imageCompressionService;

    @RequestMapping(path = "/upload", method = POST, consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Map<String, String>> uploadImage(@RequestPart("imageFile") MultipartFile imageFile) throws IOException {
        String fileName = imageFile.getOriginalFilename();
        File directory = new File(uploadPath);

        if (!directory.exists()) {
            if (directory.mkdir()) {
                System.out.println("Directory created successfully!");
            } else {
                System.out.println("Failed to create directory!");
            }
        }

        if (imageFile.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        try {
            //
            // Save the image file
            Path filePath = Paths.get(uploadPath, fileName);
            Files.write(filePath, imageFile.getBytes());

            Map<String, String> img = new HashMap<>();
            img.put("url", "api/image/" + fileName);
            return ResponseEntity.ok(img);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/convert")
    public String convert() {
        imageCompressionService.transformImages();
        return "Status running";
    }

    @GetMapping("/{imageName}")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) throws IOException {
        Path imagePath = Paths.get(uploadPath, imageName);

        if (!Files.exists(imagePath)) {
            return ResponseEntity.notFound().build();
        }

        try {
            byte[] imageData = Files.readAllBytes(imagePath);
            return ResponseEntity.ok()
                .cacheControl(CacheControl.maxAge(30, TimeUnit.DAYS))
                .contentType(imageName.contains(".png") ? MediaType.IMAGE_PNG : MediaType.IMAGE_JPEG)
                .body(imageData);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/thumb/{imageName}")
    public ResponseEntity<byte[]> getThumbnailImage(@PathVariable String imageName) throws IOException {
        Path imagePath = Paths.get(uploadPath, imageName);

        if (!Files.exists(imagePath)) {
            return ResponseEntity.notFound().build();
        }

        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            Thumbnails.of(imagePath.toFile())
                // .scale(.5)
                .size(300, 300)
                .outputQuality(0.5)
                .toOutputStream(baos);

            return ResponseEntity.ok()
                .cacheControl(CacheControl.maxAge(30, TimeUnit.DAYS))
                .contentType(imageName.contains(".png") ? MediaType.IMAGE_PNG : MediaType.IMAGE_JPEG)
                .body(baos.toByteArray());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/thumb/{size}/{q}/{imageName}")
    public ResponseEntity<byte[]> getThumbnailImageBySize(@PathVariable String imageName, @PathVariable int size, @PathVariable float q)
        throws IOException {
        Path imagePath = Paths.get(uploadPath, imageName.replace(".webp", ".png"));

        if (!Files.exists(imagePath)) {
            return ResponseEntity.notFound().build();
        }

        try {
            ByteArrayInputStream byteInputStrm = null;
            // byteInputStrm = new ByteArrayInputStream(convertBufferedImageToByteArray(
            //         resizeImage(convertImageToByteArray(imagePath.toString()), size, size), "png"));
            byteInputStrm = new ByteArrayInputStream(convertImageToByteArray(imagePath.toString(), size, size));

            BufferedImage image = ImageIO.read(byteInputStrm);
            ByteArrayOutputStream baos2 = new ByteArrayOutputStream();
            ImageWriter writer = ImageIO.getImageWritersByMIMEType("image/webp").next();
            ImageOutputStream imgOutStrm = ImageIO.createImageOutputStream(baos2);
            writer.setOutput(imgOutStrm);
            WebPWriteParam writeParam = new WebPWriteParam(writer.getLocale());
            writeParam.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
            writeParam.setCompressionType(writeParam.getCompressionTypes()[WebPWriteParam.LOSSY_COMPRESSION]);
            writeParam.setCompressionQuality(q); // set compression quality
            writer.write(null, new IIOImage(image, null, null), writeParam);
            imgOutStrm.close();

            return ResponseEntity.ok()
                .cacheControl(CacheControl.maxAge(30, TimeUnit.DAYS))
                // .contentType(imageName.contains(".png") ? MediaType.IMAGE_PNG :
                // MediaType.IMAGE_JPEG)
                .header("content-type", "image/webp")
                .body(baos2.toByteArray());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            System.out.println(e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/thumb/{size}/{q}/{lossy}/{imageName}")
    public ResponseEntity<byte[]> getThumbnailImageBySizeByLossy(
        @PathVariable String imageName,
        @PathVariable int size,
        @PathVariable float q,
        @PathVariable boolean lossy
    ) throws IOException {
        Path imagePath = Paths.get(uploadPath, imageName.replace(".webp", ".png"));

        if (!Files.exists(imagePath)) {
            return ResponseEntity.notFound().build();
        }

        try {
            ByteArrayInputStream byteInputStrm = null;
            // byteInputStrm = new ByteArrayInputStream(convertBufferedImageToByteArray(
            //         resizeImage(convertImageToByteArray(imagePath.toString()), size, size), "png"));
            byteInputStrm = new ByteArrayInputStream(convertImageToByteArray(imagePath.toString(), size, size));

            BufferedImage image = ImageIO.read(byteInputStrm);
            ByteArrayOutputStream baos2 = new ByteArrayOutputStream();
            ImageWriter writer = ImageIO.getImageWritersByMIMEType("image/webp").next();
            ImageOutputStream imgOutStrm = ImageIO.createImageOutputStream(baos2);
            writer.setOutput(imgOutStrm);
            WebPWriteParam writeParam = new WebPWriteParam(writer.getLocale());
            writeParam.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
            writeParam.setCompressionType(
                writeParam.getCompressionTypes()[lossy ? WebPWriteParam.LOSSY_COMPRESSION : WebPWriteParam.LOSSLESS_COMPRESSION]
            );
            writeParam.setCompressionQuality(q); // set compression quality
            writer.write(null, new IIOImage(image, null, null), writeParam);
            imgOutStrm.close();

            return ResponseEntity.ok()
                .cacheControl(CacheControl.maxAge(30, TimeUnit.DAYS))
                // .contentType(imageName.contains(".png") ? MediaType.IMAGE_PNG :
                // MediaType.IMAGE_JPEG)
                .header("content-type", "image/webp")
                .body(baos2.toByteArray());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            System.out.println(e);
            return ResponseEntity.internalServerError().build();
        }
    }

    public static BufferedImage resizeImage(byte[] imageData, int maxWidth, int maxHeight) throws IOException {
        ByteArrayInputStream byteInputStrm = new ByteArrayInputStream(imageData);
        BufferedImage image = ImageIO.read(byteInputStrm);

        // Calculate scale factors to maintain aspect ratio
        double scaleX = (double) maxWidth / image.getWidth();
        double scaleY = (double) maxHeight / image.getHeight();
        double scale = Math.min(scaleX, scaleY);

        // Create AffineTransform for scaling
        AffineTransform transform = AffineTransform.getScaleInstance(scale, scale);

        // Create a new BufferedImage for the resized image
        BufferedImage resizedImage = new BufferedImage(
            (int) Math.round(image.getWidth() * scale),
            (int) Math.round(image.getHeight() * scale),
            image.getType()
        );

        // Apply transformation using a separate rendering step (corrected line)
        Graphics2D g2d = resizedImage.createGraphics();
        g2d.drawImage(image, transform, null);
        g2d.dispose();

        return resizedImage;
    }

    public static BufferedImage convertByteArrayToBufferedImage(byte[] imageData) throws IOException {
        ByteArrayInputStream inputStream = new ByteArrayInputStream(imageData);
        return ImageIO.read(inputStream);
    }

    public static byte[] convertImageToByteArray(String imagePath, int maxWidth, int maxHeight) throws IOException {
        // Check if file exists
        File imageFile = new File(imagePath);
        if (!imageFile.exists()) {
            throw new IOException("Image file not found: " + imagePath);
        }

        // Read image into BufferedImage
        BufferedImage image = ImageIO.read(imageFile);

        // Create a ByteArrayOutputStream to capture the image data
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        // Use a suitable image format (adjust as needed)
        String format = "png"; // Or "png", "bmp", etc.
        ImageIO.write(image, format, outputStream);

        // Get the byte array from the stream
        byte[] imageData = outputStream.toByteArray();

        // Close the stream (optional)
        outputStream.close();

        ByteArrayInputStream byteInputStrm = new ByteArrayInputStream(imageData);
        BufferedImage image2 = ImageIO.read(byteInputStrm);

        // Calculate scale factors to maintain aspect ratio
        double scaleX = (double) maxWidth / image2.getWidth();
        double scaleY = (double) maxHeight / image2.getHeight();
        double scale = Math.min(scaleX, scaleY);

        // Create AffineTransform for scaling
        AffineTransform transform = AffineTransform.getScaleInstance(scale, scale);

        // Create a new BufferedImage for the resized image
        BufferedImage resizedImage = new BufferedImage(
            (int) Math.round(image2.getWidth() * scale),
            (int) Math.round(image2.getHeight() * scale),
            image2.getType()
        );

        // Apply transformation using a separate rendering step (corrected line)
        Graphics2D g2d = resizedImage.createGraphics();
        g2d.drawImage(image2, transform, null);
        g2d.dispose();

        return convertBufferedImageToByteArray(resizedImage, "png");
    }

    public static byte[] convertBufferedImageToByteArray(BufferedImage image, String format) throws IOException {
        if (format == null || format.isEmpty()) {
            throw new IllegalArgumentException("Image format cannot be null or empty");
        }

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, format, baos);
        byte[] imageData = baos.toByteArray();
        baos.close(); // Optional (considered good practice)

        return imageData;
    }
}
