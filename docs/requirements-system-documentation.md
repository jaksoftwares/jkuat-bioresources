JKUAT Bioresources Web Application – Detailed Requirements and System Documentation
1. System Overview
The JKUAT Bioresources Web Application is a centralized platform designed to digitally manage, store, and share bioresource information collected by researchers, MSc and PhD students, and professors. The system will cover:
Microorganisms – Bacteria, fungi, and other lab specimens.
Plants & African Indigenous Vegetables (AIVs) – Native plants with scientific, nutritional, and medicinal information.
Herbarium – Digitized plant collections stored in JKUAT’s physical herbarium.
The platform will allow data entry, import/export, management, search, and retrieval for different types of users.

2. System Structure & Organization
2.1. User Roles and Permissions
User Role
Description
Access & Privileges
Technical Team
IT staff managing the system
Full system access: integration, maintenance, data backups, troubleshooting
Administrators
Manage platform administration
Add/remove users, manage roles, oversee data integrity
Researchers
Contributing scientists
Add/edit their own bioresource records, import/export data, attach photos and notes
Public Users
General public & students
View and search bioresource data; no editing privileges


2.2. Data Organization
2.2.1. Microorganisms
Storage Hierarchy:
Fridge (F1, F2, F3…)
Shelf (S1, S2, S3…)
Tray (T1, T2, T3…)
Partition (P1, P2, P3…)
Test Tube (Tube 1, Tube 2…) - has specific scientific name.
Metadata for each microorganism:
Scientific Name (e.g., Salmonella typhi)
Source (where it was isolated)
Researcher / Contributor
Storage location (Fridge → Shelf → Tray → Partition → Tube)
Optimum growth temperature
pH range
Growth medium
Specific characteristics (e.g., enzymatic activity)
Date of storage and experiment details

2.2.2. African Indigenous Vegetables (AIVs)
Data Fields:
Scientific name
Local names (multilingual support: Swahili, English, etc.)
Photos of plant and parts (leaf, fruit, root)
Growth conditions (soil type, rainfall, temperature)
Region / geographic distribution
Special features (nutritional value, medicinal value, cultural significance)
Recommendations for use (dietary, medicinal)
Researcher / Contributor
References / source documentation








2.2.3. Herbarium Collections
Data Fields:
Plant scientific name
Common/local names
Herbarium reference code
Collector / Researcher
Storage location in physical herbarium
Photos/scans of specimens
Collection date
Notes on habitat, ecological relevance, or medicinal properties

2.3. Platform Modules & Functionalities
2.3.1. User Management Module
Register, login, and manage user accounts
Assign roles and permissions (Technical Team, Admin, Researcher, Public)
Manage access to specific data (edit, view, approve)
2.3.2. Data Entry & Management
Manual Input: Researchers can input new records via web forms.
Bulk Import: Upload CSV/Excel files in standardized format.
Data Editing: Update existing records with new research or corrections.
Data Validation: Ensure correct format, mandatory fields, and consistency.
2.3.3. Search & Retrieval
Basic Search: Keyword search across all bioresource types.
Advanced Search / Filters: By category (Microorganism, Plant, AIV, Herbarium), location, scientific name, researcher, growth conditions, or medicinal properties.
Data Export: Option to download search results or records (CSV, PDF).
2.3.4. Microorganism Storage Visualization
Hierarchical representation of Fridge → Shelf → Tray → Partition → Tube
Search by storage location or scientific name
Visual mapping of microorganisms for easy inventory management


2.3.5. Reporting & Analytics
Generate reports by:
Researcher contribution
Resource type
Geographic distribution
Storage utilization (for microorganisms)
Export reports as PDF or Excel
2.3.6. Media Management
Upload and manage images of plants, vegetables, and herbarium specimens
Attach documents, lab notes, or references
2.3.7. Multilingual Support
Support for Swahili, English, and other relevant languages for AIVs
Translation of names and descriptions for public accessibility
2.3.8. Security & Data Integrity
Role-based access control
Audit logs for data changes
Backup and recovery functionality
2.4. Technical Requirements
Platform Type: Web application (responsive for desktop & mobile)
Database: Relational DB - PostgreSQL for structured bioresource data
Front-end Framework: Next js 
Back-end Framework: Next Js Serverless
Authentication: Secure login with role-based permissions
File Storage: Cloud or local server for images and documents - cloudinary 
Data Import: CSV/Excel with template validation






2.5. Expected Outcomes
Centralized Knowledge Repository – All bioresources documented digitally.
Accessibility & Visibility – Researchers, students, and public users can easily find and use bioresource information.
Data Preservation – Prevents loss of biological data from physical decay or misplacement.
Collaboration & Research Enhancement – Enables researchers to build on each other’s findings.
Inventory Management – Efficient tracking of microorganisms and herbarium specimens.

This documentation can serve as a blueprint for design, development, and deployment of the JKUAT Bioresources Web Application.




JKUAT Bioresources Application – Problem Description & Project Requirements
1. Problem Description
At the Jomo Kenyatta University of Agriculture and Technology (JKUAT), researchers, MSc and PhD students, and professors in the field of bioresources conduct extensive studies on plants, microorganisms, herbarium specimens, and African Indigenous Vegetables (AIVs). However, a major challenge exists:
Research findings are typically stored physically—such as in laboratories, fridges, shelves, and herbarium collections—and are only known to the individual researchers.
Valuable discoveries, including new plant species, bacteria, and other microorganisms, often remain inaccessible to the broader scientific community and may eventually be lost.
Physical storage of data, such as plant specimens or microorganisms in test tubes, is prone to decay or misplacement, leading to the loss of critical scientific information.
There is currently no centralized platform for sharing these discoveries, limiting collaboration, visibility, and further research opportunities.
The lack of a structured digital system results in lost data, reduced research impact, and inefficiencies in accessing bioresource information for both academic and public purposes.

2. Purpose of the Application
The JKUAT Bioresources Web Application aims to:
Digitize and centralize bioresource information, including plants, microorganisms, African Indigenous Vegetables (AIVs), and herbarium collections.
Ensure research findings are accessible to both internal and external users, enhancing visibility, collaboration, and long-term preservation of scientific data.
Allow researchers to input or import their data and discoveries into the system in a structured format.
Provide a seamless search and retrieval system for bioresources.





3. Key Features & Requirements
3.1. Data Management
Plants & African Indigenous Vegetables (AIVs)
Include scientific names, local/multilingual names, photos, growth conditions, regions where they grow, special features, and medicinal or nutritional value.
Recommendations for use, e.g., suitable for high blood pressure, rich in iron, or beneficial for eyesight.
Ability to input data manually or import from Excel/CSV files in a standardized format.
Microorganisms
Record detailed storage information: Fridge → Shelf → Tray → Partition → Test Tube.
Store scientific name, source, researcher, optimum temperature, pH range, growth medium, and specific characteristics (e.g., hydrolyzing capabilities).
Ensure location and scientific metadata are captured for each specimen.
Herbarium
Digitize plant specimens currently documented in physical collections.
Include photos, taxonomic information, and storage location.

3.2. User Roles & Access Levels
Technical Team – Full access to manage, integrate, and maintain the platform.
Administrators – Manage administrative functions and user accounts.
Researchers – Can register, upload, and manage their bioresource data.
Public Users – Can search and access information about bioresources, without editing privileges.

3.3. System Functionality
Seamless search capabilities for all types of bioresources.
Ability to add, edit, and update data manually or via file import.
Categorization by type: Microbiology, AIVs, Herbarium, etc.
Clear, organized display of scientific, cultural, and practical information.
Support for multilingual data entry (e.g., Swahili, English).



4. Expected Outcome
A centralized web platform where all bioresource data at JKUAT is stored, easily searchable, and accessible.
Improved preservation of research findings and increased visibility of discoveries.
Facilitation of collaboration among researchers, students, and the public.
Digitization of previously physical-only resources, including herbarium collections and microbiological specimens. 



