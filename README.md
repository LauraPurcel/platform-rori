 Scurtă descriere a proiectului:

Acest proiect reprezintă o platformă web pentru managementul angajaților, al task-urilor și al cererilor de concediu într-o companie de software. Aplicația este gândită ca un sistem intern, utilizat de angajați, manageri și departamentul de resurse umane, fiecare având funcționalități diferite în funcție de rol. 
Platforma permite autentificarea securizată a utilizatorilor, inclusiv autentificare cu doi factori (2FA) pentru managerul HR (admin), gestionarea task-urilor și a angajaților, trimiterea și aprobarea cererilor de concediu, notificări prin email și notificări interne în aplicație și o secțiune de statistici, menită să ofere o imagine de ansamblu asupra activității angajaților și a task-urilor. 
Aplicația este dezvoltată modular, respectând principiile programării orientate pe obiecte și o arhitectură pe layere, ceea ce permite extinderea ușoară a funcționalităților în viitor. 

Tutorial de rulare a aplicației 

Pentru a rula aplicația, este necesar să fie instalate câteva componente de bază. În primul rând, este nevoie de Java JDK (versiunea 17 sau mai nouă). De asemenea, este necesar un server de baze de date MySQL. 
După instalarea MySQL, trebuie creată o bază de date goală. Tabelele vor fi create automat de către Spring Boot, pe baza entităților JPA, dacă este setată corespunzător proprietatea spring.jpa.hibernate.ddl-auto (de exemplu, update). Nu este necesară scrierea manuală a scripturilor SQL pentru crearea tabelelor, decât dacă se dorește un control mai detaliat. 
Pentru backend, proiectul se deschide într-un IDE precum IntelliJ IDEA, se configurează fișierul application.properties cu datele de conectare la baza de date și cu datele contului de email folosit pentru trimiterea mesajelor. Aplicația se pornește ca un proiect Spring Boot. 
Pentru frontend, este necesară instalarea Node.js. După instalare, se rulează comanda npm install pentru instalarea dependențelor, urmată de npm run dev. Aplicația va fi accesibilă din browser. 
 
