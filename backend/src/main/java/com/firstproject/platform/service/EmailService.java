package com.firstproject.platform.service;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String body) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
    public void sendOtp(String email, String otp) {
        String subject = "Codul tău OTP";
        String body = "Codul tău OTP este: <b>" + otp + "</b>. Expiră în 5 minute.";
        System.out.println("OTP trimis la " + email + ": " + otp + " mesaj din email service");
        try {
            sendEmail(email, subject, body);
            System.out.println("OTP trimis după email service"); // doar dacă trimite OK
        } catch (Exception e) {
            System.out.println("Eroare la trimiterea email-ului OTP:");
            e.printStackTrace();
        }
    }
}
