# Nazmul Hassan || Portfolio

- [Live Link](https://nazmul-nhb.vercel.app/)

---

## Overview

Welcome to my personal portfolio! This website showcases my skills, projects, published packages, and contact information in an interactive and visually appealing manner. The portfolio is designed with a focus on simplicity and functionality while incorporating advanced features for a smooth user experience.

### Key Features

1. **Homepage**
    - **Bio**: Learn more about me and professional background.
    - **Skills**: A detailed list of the technologies I work with, including frontend, backend, and tools.
    - **Projects**: A collection of my personal and professional projects with descriptions, tech stack, and live links.
    - **Education**: My academic qualifications, including Bachelor of Arts and Master of Arts in English.

2. **Floating Navigation Buttons**:
    - **A Floating Navigation Button**: The homepage features **a floating button** with a smooth animation. It hides the menu to the right of the screen and reappears from the right when clicked. Upon expansion, the button provides quick navigation to key sections like Bio, Skills, Projects and Education. Clicking on any section name scrolls smoothly to the corresponding section, and the active section is highlighted, clearly indicating which section the user is currently viewing.
    - **Scroll to Top/Bottom Buttons**: Instant navigation to the top or bottom of the page for convenience.
    - **Floating Messages Button (Secret)**: A floating button appears in the top left corner below the navbar, displaying the count of unread messages. Clicking this button opens a dedicated section where I can view all messages sent through the contact form. Each message includes sender details and content, with the option to delete any message for better organization. Additionally, all messages sent through the form are also delivered to my email for easy tracking. Refer to `Contact Me Page`

3. **Contact Me Page**:
    - Contains a contact form allowing visitors to send messages directly to my inbox.
    - **Auto-Reply Feature**: Upon sending a message, the sender receives an automatic reply from my email, confirming that I have received their message and a copy of their original message.
    - **Backend**: Powered by **NodeMailer** integrated with **Google APIs** to securely handle message delivery.

4. **Packages Page**:
    - Highlights my published **npm packages** with brief introduction, installation command and related links.

5. **Interactive Carousel**:
    - A **moving animation** carousel showcasing my contact information, dynamically under my bio info.
    - **Profile Picture**: My picture is displayed on the right side of the screen, with an **enlargement feature** when clicked.

6. **Secret Login Feature**:
    - A hidden login button (accessed via the logo on the far left) that allows me to update my portfolio directly from the website without needing a code editor.
    - **Two-step Verification**: Protected by a secret code stored in the server environment file, and the login process is authenticated with my **Google Account** (Only my Gmail is allowed).
    - The **update link changes** every time I access the page for enhanced security.
    - A private message button allows me to view all the emails sent by visitors directly on the website. I can also check these messages through Gmail.

7. **Custom Loading Spinner**:
    - A custom-built loading spinner that features my logo is displayed while the bio information is being fetched from the server.

8. **Custom Navbar Design**:
    - The website includes a **custom navigation bar** with a distinct **compass button** located on the far right of the navbar for small devices. When clicked, the menu elegantly appears with a smooth animation, sliding down from the top of the screen. The same animation hides the menu when the compass button is clicked again, providing a seamless and visually appealing navigation experience.

9. **Footer Section**:
    - The footer includes an **animated logo**, social media/contact information, and copyright details.

## Technologies Used

- **Frontend Technologies**: React, TailwindCSS, JavaScript
- **Frontend Tools**: Tanstack Query & Axios for Data Fetching, Firebase for Authentication, Vite as Build Tool
- **[Backend](https://github.com/nazmul-nhb/nhb-portfolio-server)**: Node.js, Express.js, MongoDB, JWT for Authentication, Nodemailer, Google APIs
- **Deployment**: Vercel

---

## Explore More Features

Please visit my portfolio to explore more features and learn more about me:

- [nazmul-nhb.vercel.app](https://nazmul-nhb.vercel.app/)
