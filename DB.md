# MySQL: Beginner to Intermediate
### A Complete Guide with Real-World Scenarios, DBMS Concepts & Best Practices

> **How to use this guide:** Read top-to-bottom on your first pass. Every concept is paired with a real-world analogy and runnable SQL. By the end you'll understand not just *how* to write MySQL, but *why* it works the way it does.

---

## Table of Contents

1. [What is a Database? — The Filing Cabinet Analogy](#1-what-is-a-database)
2. [DBMS vs RDBMS — What MySQL Actually Is](#2-dbms-vs-rdbms)
3. [Installing MySQL & First Steps](#3-installing-mysql--first-steps)
4. [Data Types — Choosing the Right Container](#4-data-types)
5. [Creating Databases & Tables — Building Your Filing System](#5-creating-databases--tables)
6. [CRUD Operations — The Four Pillars](#6-crud-operations)
7. [Filtering & Sorting — Finding the Needle](#7-filtering--sorting)
8. [Relationships & Foreign Keys — The Web of Data](#8-relationships--foreign-keys)
9. [JOINs — Combining Tables Like a Pro](#9-joins)
10. [Aggregate Functions & GROUP BY — Analytics Simplified](#10-aggregate-functions--group-by)
11. [Subqueries — Queries Inside Queries](#11-subqueries)
12. [Indexes — The Library Index Card System](#12-indexes)
13. [ACID Properties — The Promise of Reliability](#13-acid-properties)
14. [Transactions — All or Nothing](#14-transactions)
15. [Normalization — Eliminating Redundancy](#15-normalization)
16. [Views — Saved Windows into Your Data](#16-views)
17. [Stored Procedures & Functions](#17-stored-procedures--functions)
18. [CAP Theorem — The Distributed Systems Trade-Off](#18-cap-theorem)
19. [Query Optimization & EXPLAIN](#19-query-optimization--explain)
20. [Security Best Practices](#20-security-best-practices)
21. [Real-World Project: E-Commerce Database](#21-real-world-project-e-commerce-database)

---

## 1. What is a Database?

### The Filing Cabinet Analogy

Imagine you run a busy hospital. You have thousands of patients, and for each one you keep a folder with their name, age, medical history, prescriptions, and bills. Where do you keep all these folders?

- **Old way:** Physical filing cabinets. Hundreds of drawers, thousands of folders. Finding a patient takes minutes. Two nurses might update the same file simultaneously and overwrite each other. A fire could destroy everything.
- **Database way:** A digital, organized system where every patient's record is stored, searchable in milliseconds, protected from simultaneous conflicts, and backed up automatically.

A **database** is simply an organized collection of structured data — stored so it can be easily accessed, managed, and updated.

### Why Not Just Use Excel?

This is the most common beginner question. Excel works fine up to a few thousand rows, but:

| Scenario | Excel | Database |
|---|---|---|
| 10 million customer records | Crashes | Handles easily |
| Two people editing simultaneously | Conflict, data loss | Concurrent access with locking |
| Linking customers to their orders | Manual VLOOKUP | Automatic via relationships |
| Complex queries ("find all customers in Karachi who ordered >3 times last month") | Painful, fragile | One SQL query |
| Data integrity (no invalid values) | Hope for the best | Enforced by constraints |

**Real-world use case:** Amazon has billions of orders. A spreadsheet would be comically inadequate. Their entire product catalog, customer data, and order history live in databases.

---

## 2. DBMS vs RDBMS

### DBMS — Database Management System

A **DBMS** is the software that manages a database — it handles storing, retrieving, and organizing data. Think of it as the *librarian* who manages the library (the database).

Types of DBMS:
- **Relational (RDBMS):** Data in tables with relationships — MySQL, PostgreSQL, Oracle, SQL Server
- **Document:** Data as JSON documents — MongoDB, CouchDB
- **Key-Value:** Simple key→value pairs — Redis, DynamoDB
- **Graph:** Nodes and edges — Neo4j
- **Column-family:** Wide-column stores — Cassandra, HBase

### RDBMS — Relational Database Management System

MySQL is an **RDBMS**. The "relational" part means:

1. Data is stored in **tables** (like spreadsheet grids)
2. Tables can be **related** to each other via keys
3. You query with **SQL** (Structured Query Language)
4. It enforces **ACID properties** (more on this later)

### The Analogy: School Records

Think of a school's administrative system:
- **Students table** — student_id, name, date_of_birth
- **Classes table** — class_id, subject, teacher
- **Enrollments table** — which student is in which class

These three tables are *related*. One student can be in many classes. This is the core idea of relational databases.

```
Students ──────────── Enrollments ──────────── Classes
student_id (PK)       student_id (FK)           class_id (PK)
name                  class_id (FK)             subject
date_of_birth         enrolled_on               teacher
```

### SQL — The Language of Databases

SQL (Structured Query Language) is the standardized language for talking to an RDBMS. It reads almost like English:

```sql
SELECT name FROM students WHERE city = 'Karachi';
-- "Give me the names of all students from Karachi"
```

---

## 3. Installing MySQL & First Steps

### Installation (Quick Reference)

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

**macOS (Homebrew):**
```bash
brew install mysql
brew services start mysql
```

**Windows:** Download MySQL Installer from mysql.com — use MySQL Workbench for a GUI.

### Connecting to MySQL

```bash
# Command line
mysql -u root -p

# With a specific database
mysql -u root -p my_database
```

### Your First Commands

```sql
-- Show all databases on this server
SHOW DATABASES;

-- Create a new database
CREATE DATABASE hospital_db;

-- Switch to that database
USE hospital_db;

-- Show all tables in current database
SHOW TABLES;

-- Exit
EXIT;
```

### DBMS Concept: The Server/Client Model

MySQL runs as a **server** (a background process). Your application, MySQL Workbench, or the `mysql` CLI are all **clients** that connect to it. This means:
- Multiple applications can use the same database simultaneously
- The database server can run on a separate machine from your app
- Access is controlled via usernames and passwords

---

## 4. Data Types

### The "Right Container" Analogy

When you ship packages, you pick the right box size — you don't ship a ring in a moving truck. Data types are the same idea: pick the smallest, most appropriate type for your data. This saves storage, improves performance, and prevents bad data.

### Numeric Types

```sql
-- Integers (whole numbers)
TINYINT      -- -128 to 127 (or 0 to 255 unsigned). Great for age, rating (1-5), status flags.
SMALLINT     -- -32,768 to 32,767. Good for year, small counts.
INT          -- -2.1 billion to 2.1 billion. Most common for IDs, quantities.
BIGINT       -- ±9.2 × 10^18. Use for large counters, financial systems, social media IDs.

-- Decimals
DECIMAL(10,2) -- Exact decimal. ALWAYS use for money. 10 total digits, 2 after decimal point.
FLOAT         -- Approximate decimal. OK for scientific measurements, NOT money.
DOUBLE        -- Higher precision float. Same warning as FLOAT.
```

**Real-world rule: Never use FLOAT for money.** `0.1 + 0.2` in floating point is `0.30000000000000004`. That's a $0.00000000000000004 accounting error multiplied across millions of transactions.

```sql
-- WRONG for money
price FLOAT

-- CORRECT for money
price DECIMAL(12, 2)  -- Stores up to 9,999,999,999.99
```

### String Types

```sql
CHAR(n)       -- Fixed length. Always uses n bytes. Great for fixed codes like 'US', 'PK', ISBN.
VARCHAR(n)    -- Variable length. Only uses what it needs (+ 1-2 bytes). Most common.
TEXT          -- Long text, up to 65KB. Blog posts, descriptions.
MEDIUMTEXT    -- Up to 16MB. Long articles, HTML content.
LONGTEXT      -- Up to 4GB. Rarely needed.
```

```sql
-- Example: User profile
username    VARCHAR(50)     -- Usernames vary in length
country_code CHAR(2)        -- Always exactly 2 characters: 'PK', 'US', 'GB'
bio         TEXT            -- Variable length profile description
```

### Date & Time Types

```sql
DATE          -- '2024-03-15' — Just the date. Birthdays, event dates.
TIME          -- '14:30:00' — Just the time.
DATETIME      -- '2024-03-15 14:30:00' — Date + time, stored as-is (no timezone).
TIMESTAMP     -- Like DATETIME, but stored in UTC & auto-converts to server timezone.
YEAR          -- Just the year: 2024.
```

**Best practice:** Use `TIMESTAMP` for "when was this record created/updated" — it stores in UTC so it's timezone-safe. Use `DATETIME` for things like appointment times where you want to store exactly what the user entered.

### Boolean

MySQL doesn't have a true BOOLEAN type — it uses `TINYINT(1)`:

```sql
is_active   TINYINT(1) DEFAULT 1   -- 0 = false, 1 = true
is_verified BOOLEAN                 -- Alias for TINYINT(1)
```

### JSON (MySQL 5.7.8+)

```sql
preferences JSON   -- Store semi-structured data
-- Example value: {"theme": "dark", "notifications": true, "language": "en"}
```

---

## 5. Creating Databases & Tables

### DBMS Concept: Schema

A **schema** is the blueprint of your database — the structure of your tables, columns, data types, and relationships. It's like the architect's plan before a building is constructed.

### Creating a Hospital Database

Let's build a real-world hospital database step by step.

```sql
-- Create and use the database
CREATE DATABASE hospital_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hospital_db;
```

> **Why utf8mb4?** Standard `utf8` in MySQL only supports 3-byte characters. `utf8mb4` supports full Unicode including emojis and many Asian scripts. Always use `utf8mb4` for modern applications.

### Your First Table: Patients

```sql
CREATE TABLE patients (
    -- Primary Key: unique identifier for every row
    patient_id      INT             NOT NULL AUTO_INCREMENT,
    
    -- Personal info
    first_name      VARCHAR(50)     NOT NULL,
    last_name       VARCHAR(50)     NOT NULL,
    date_of_birth   DATE            NOT NULL,
    gender          ENUM('M','F','Other') NOT NULL,
    
    -- Contact
    phone           VARCHAR(20),
    email           VARCHAR(100)    UNIQUE,
    
    -- Address
    city            VARCHAR(100),
    country         CHAR(2)         DEFAULT 'PK',
    
    -- Metadata
    registered_at   TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active       TINYINT(1)      DEFAULT 1,
    
    -- Define primary key
    PRIMARY KEY (patient_id)
);
```

### Anatomy of a Table Definition

Let's break down the key parts:

**PRIMARY KEY** — The unique identifier for each row. Like a national ID number — no two patients share one. `AUTO_INCREMENT` means MySQL automatically assigns 1, 2, 3... when you insert a new row.

**NOT NULL** — This column *must* have a value. You can't add a patient without a name.

**UNIQUE** — Every value in this column must be different across all rows. Two patients can't share an email.

**DEFAULT** — If you don't provide a value, use this one. `CURRENT_TIMESTAMP` means "right now."

**ENUM** — Only allows specific values. Gender can only be 'M', 'F', or 'Other' — nothing else.

**ON UPDATE CURRENT_TIMESTAMP** — Automatically updates `updated_at` every time the row changes. Perfect for audit trails.

### Modifying Tables — ALTER TABLE

Databases evolve. You'll constantly need to add, modify, or remove columns.

```sql
-- Add a new column
ALTER TABLE patients ADD COLUMN blood_type ENUM('A+','A-','B+','B-','AB+','AB-','O+','O-');

-- Add column at a specific position
ALTER TABLE patients ADD COLUMN middle_name VARCHAR(50) AFTER first_name;

-- Modify a column's type or constraints
ALTER TABLE patients MODIFY COLUMN phone VARCHAR(30);

-- Rename a column (MySQL 8.0+)
ALTER TABLE patients RENAME COLUMN phone TO phone_number;

-- Drop a column
ALTER TABLE patients DROP COLUMN middle_name;

-- Add an index (covered in depth later)
ALTER TABLE patients ADD INDEX idx_email (email);

-- Rename a table
ALTER TABLE patients RENAME TO hospital_patients;
-- Rename it back
ALTER TABLE hospital_patients RENAME TO patients;
```

### Viewing Table Structure

```sql
-- Show table structure
DESCRIBE patients;
-- or shorthand:
DESC patients;

-- Show the CREATE TABLE statement (very useful)
SHOW CREATE TABLE patients;
```

---

## 6. CRUD Operations

**CRUD** stands for **Create, Read, Update, Delete** — the four fundamental operations on any data. Every app you've ever used does these four things constantly.

### C — CREATE (INSERT)

```sql
-- Insert a single patient
INSERT INTO patients (first_name, last_name, date_of_birth, gender, phone, email, city)
VALUES ('Ahmed', 'Khan', '1990-05-15', 'M', '0300-1234567', 'ahmed.khan@email.com', 'Karachi');

-- Insert multiple patients at once (much faster than multiple single inserts)
INSERT INTO patients (first_name, last_name, date_of_birth, gender, city)
VALUES
    ('Fatima', 'Ali',     '1985-11-23', 'F', 'Lahore'),
    ('Omar',   'Sheikh',  '1992-07-08', 'M', 'Islamabad'),
    ('Sara',   'Malik',   '2000-01-30', 'F', 'Karachi'),
    ('Bilal',  'Hussain', '1978-09-12', 'M', 'Rawalpindi');

-- Insert and handle duplicates gracefully
-- If email already exists, update the phone number instead
INSERT INTO patients (first_name, last_name, date_of_birth, gender, email, phone)
VALUES ('Ahmed', 'Khan', '1990-05-15', 'M', 'ahmed.khan@email.com', '0300-9999999')
ON DUPLICATE KEY UPDATE phone = VALUES(phone);
```

### R — READ (SELECT)

SELECT is the most powerful and complex command. Let's go from simple to advanced:

```sql
-- Select all columns, all rows
SELECT * FROM patients;

-- Select specific columns (ALWAYS prefer this over SELECT * in production)
SELECT first_name, last_name, city FROM patients;

-- Add a computed column
SELECT 
    first_name, 
    last_name,
    YEAR(CURDATE()) - YEAR(date_of_birth) AS age
FROM patients;

-- Use column aliases for cleaner output
SELECT 
    CONCAT(first_name, ' ', last_name) AS full_name,
    email                               AS contact_email,
    city                                AS location
FROM patients;
```

> **Why avoid SELECT \*?** It retrieves all columns even ones you don't need, wastes bandwidth, breaks if table structure changes, and prevents certain query optimizations.

### U — UPDATE

```sql
-- ALWAYS use WHERE with UPDATE (or you'll update ALL rows)
UPDATE patients
SET phone = '0321-5556666'
WHERE patient_id = 1;

-- Update multiple columns at once
UPDATE patients
SET 
    city    = 'Karachi',
    country = 'PK',
    updated_at = CURRENT_TIMESTAMP
WHERE patient_id = 3;

-- Update based on a condition (e.g., mark all Lahore patients as needing review)
UPDATE patients
SET is_active = 0
WHERE city = 'Lahore' AND is_active = 1;
```

⚠️ **The Deadliest Mistake in SQL:**
```sql
-- MISSING WHERE CLAUSE — Updates ALL rows in the table!
UPDATE patients SET city = 'Karachi';  -- Every patient is now from Karachi. Disaster.

-- Always test your WHERE clause with a SELECT first:
SELECT * FROM patients WHERE city = 'Lahore';  -- See what you'd affect
UPDATE patients SET is_active = 0 WHERE city = 'Lahore';  -- Then update
```

### D — DELETE

```sql
-- Delete a specific record
DELETE FROM patients WHERE patient_id = 5;

-- Delete based on condition
DELETE FROM patients WHERE is_active = 0 AND registered_at < '2020-01-01';

-- TRUNCATE: Remove all rows, faster than DELETE, resets AUTO_INCREMENT
TRUNCATE TABLE patients;
-- Note: TRUNCATE cannot be rolled back in most cases; DELETE can.

-- DROP: Remove the entire table structure + data
DROP TABLE patients;

-- Safe delete pattern: soft delete (don't actually delete, just mark as deleted)
-- This is what most real apps do
ALTER TABLE patients ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL;
UPDATE patients SET deleted_at = CURRENT_TIMESTAMP WHERE patient_id = 5;
-- Then in all queries, add: WHERE deleted_at IS NULL
```

> **Soft Delete Pattern:** Most production databases never actually delete data. They add a `deleted_at` timestamp column. When "deleting," they set this timestamp. All queries filter `WHERE deleted_at IS NULL`. This preserves audit history, allows recovery, and satisfies compliance requirements.

---

## 7. Filtering & Sorting

### WHERE Clause — The Filter

```sql
-- Comparison operators
SELECT * FROM patients WHERE city = 'Karachi';
SELECT * FROM patients WHERE date_of_birth > '1990-01-01';
SELECT * FROM patients WHERE patient_id != 3;
SELECT * FROM patients WHERE patient_id <> 3;  -- Same as !=

-- Range queries
SELECT * FROM patients WHERE date_of_birth BETWEEN '1985-01-01' AND '1995-12-31';
SELECT * FROM patients WHERE patient_id BETWEEN 1 AND 10;

-- List membership
SELECT * FROM patients WHERE city IN ('Karachi', 'Lahore', 'Islamabad');
SELECT * FROM patients WHERE city NOT IN ('Peshawar', 'Quetta');

-- NULL checks (NEVER use = NULL, always use IS NULL)
SELECT * FROM patients WHERE email IS NULL;
SELECT * FROM patients WHERE email IS NOT NULL;

-- Pattern matching with LIKE
SELECT * FROM patients WHERE first_name LIKE 'A%';    -- Starts with A
SELECT * FROM patients WHERE last_name LIKE '%Khan';   -- Ends with Khan
SELECT * FROM patients WHERE email LIKE '%@gmail.com'; -- Gmail users
SELECT * FROM patients WHERE first_name LIKE '_a%';    -- Second letter is 'a'
-- _ matches exactly one character, % matches any number of characters

-- Logical operators
SELECT * FROM patients 
WHERE city = 'Karachi' AND gender = 'F';

SELECT * FROM patients 
WHERE city = 'Karachi' OR city = 'Lahore';

SELECT * FROM patients 
WHERE NOT (city = 'Karachi');

-- Complex conditions (use parentheses for clarity)
SELECT * FROM patients 
WHERE (city = 'Karachi' OR city = 'Lahore') 
  AND gender = 'F' 
  AND date_of_birth > '1990-01-01';
```

### ORDER BY — Sorting Results

```sql
-- Sort ascending (default)
SELECT first_name, last_name, city FROM patients ORDER BY last_name;
SELECT first_name, last_name, city FROM patients ORDER BY last_name ASC;

-- Sort descending
SELECT * FROM patients ORDER BY registered_at DESC;  -- Newest patients first

-- Sort by multiple columns
SELECT first_name, last_name, city FROM patients 
ORDER BY city ASC, last_name ASC;  -- By city, then by last name within each city

-- Sort by computed value
SELECT first_name, last_name, YEAR(CURDATE()) - YEAR(date_of_birth) AS age
FROM patients
ORDER BY age DESC;  -- Oldest patients first
```

### LIMIT & OFFSET — Pagination

```sql
-- Get only the first 10 results
SELECT * FROM patients LIMIT 10;

-- Pagination: Page 1 (rows 1-10), Page 2 (rows 11-20), etc.
SELECT * FROM patients LIMIT 10 OFFSET 0;   -- Page 1
SELECT * FROM patients LIMIT 10 OFFSET 10;  -- Page 2
SELECT * FROM patients LIMIT 10 OFFSET 20;  -- Page 3

-- Shorthand: LIMIT offset, count
SELECT * FROM patients LIMIT 0, 10;   -- Page 1
SELECT * FROM patients LIMIT 10, 10;  -- Page 2

-- Real-world: Get the 5 most recently registered patients
SELECT first_name, last_name, registered_at 
FROM patients 
ORDER BY registered_at DESC 
LIMIT 5;
```

### Useful String Functions

```sql
-- String manipulation
SELECT UPPER(first_name), LOWER(email) FROM patients;
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM patients;
SELECT LENGTH(first_name) AS name_length FROM patients;
SELECT TRIM('  Ahmed  ');          -- 'Ahmed'
SELECT SUBSTRING(email, 1, 5);    -- First 5 characters of email
SELECT REPLACE(phone, '-', '');   -- Remove dashes from phone

-- Find patients whose name contains 'ali' (case-insensitive by default in MySQL)
SELECT * FROM patients WHERE LOWER(first_name) LIKE '%ali%';
```

### Useful Date Functions

```sql
-- Current date/time
SELECT NOW();          -- 2024-03-15 14:30:00
SELECT CURDATE();      -- 2024-03-15
SELECT CURTIME();      -- 14:30:00

-- Extract parts
SELECT YEAR(date_of_birth), MONTH(date_of_birth), DAY(date_of_birth) FROM patients;
SELECT DAYNAME('2024-03-15');  -- 'Friday'
SELECT MONTHNAME(date_of_birth) FROM patients;

-- Date arithmetic
SELECT DATE_ADD(CURDATE(), INTERVAL 30 DAY);  -- 30 days from now
SELECT DATE_SUB(CURDATE(), INTERVAL 1 YEAR);  -- 1 year ago
SELECT DATEDIFF('2024-12-31', '2024-01-01');  -- Days between two dates (364)

-- Calculate age
SELECT 
    first_name,
    date_of_birth,
    TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) AS age
FROM patients;
```

---

## 8. Relationships & Foreign Keys

### DBMS Concept: Entity-Relationship (ER) Model

Before writing any SQL, good database designers create an **ER diagram** — a visual map of entities (tables) and how they relate. This is the architect's blueprint.

**Three types of relationships:**

1. **One-to-One (1:1)** — Each patient has exactly one medical record file. One file belongs to exactly one patient.
2. **One-to-Many (1:N)** — One doctor treats many patients. Each patient has one primary doctor. *(Most common)*
3. **Many-to-Many (M:N)** — A patient can have many medications. A medication can be prescribed to many patients. *(Requires a junction table)*

### Building the Hospital Schema

```sql
-- Doctors table
CREATE TABLE doctors (
    doctor_id   INT             NOT NULL AUTO_INCREMENT,
    first_name  VARCHAR(50)     NOT NULL,
    last_name   VARCHAR(50)     NOT NULL,
    specialty   VARCHAR(100)    NOT NULL,
    license_no  VARCHAR(20)     NOT NULL UNIQUE,
    phone       VARCHAR(20),
    email       VARCHAR(100)    UNIQUE,
    hired_at    DATE,
    PRIMARY KEY (doctor_id)
);

-- Departments table
CREATE TABLE departments (
    dept_id     INT             NOT NULL AUTO_INCREMENT,
    name        VARCHAR(100)    NOT NULL UNIQUE,
    floor       TINYINT,
    PRIMARY KEY (dept_id)
);

-- Appointments table — links patients to doctors (One-to-Many from both sides)
CREATE TABLE appointments (
    appointment_id  INT         NOT NULL AUTO_INCREMENT,
    patient_id      INT         NOT NULL,  -- FK to patients
    doctor_id       INT         NOT NULL,  -- FK to doctors
    scheduled_at    DATETIME    NOT NULL,
    duration_mins   INT         DEFAULT 30,
    status          ENUM('scheduled','completed','cancelled','no_show') DEFAULT 'scheduled',
    notes           TEXT,
    created_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (appointment_id),
    
    -- Foreign key constraints
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (doctor_id)  REFERENCES doctors(doctor_id)   ON DELETE RESTRICT ON UPDATE CASCADE
);
```

### What is a Foreign Key?

A **foreign key** is a column in one table that references the primary key of another table. It's the *link* between tables.

**The Restaurant Analogy:**
- **orders** table has a `customer_id` column
- That `customer_id` must exist in the **customers** table
- You can't create an order for a customer who doesn't exist (referential integrity)
- If you try, MySQL throws an error

```sql
-- This will FAIL because patient_id 9999 doesn't exist
INSERT INTO appointments (patient_id, doctor_id, scheduled_at)
VALUES (9999, 1, '2024-04-01 10:00:00');
-- ERROR 1452: Cannot add or update a child row: a foreign key constraint fails
```

### ON DELETE and ON UPDATE Behaviors

When a parent record (e.g., a doctor) is deleted or updated, what happens to related records (appointments)?

```sql
FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) 
    ON DELETE RESTRICT   -- Block deletion if related appointments exist (safest)
    ON UPDATE CASCADE    -- If doctor_id changes, update it in appointments too

-- Options:
-- RESTRICT  : Block the parent change if children exist (default, safest)
-- CASCADE   : Automatically delete/update child rows
-- SET NULL  : Set the FK column to NULL in child rows
-- NO ACTION : Like RESTRICT but checked at end of transaction
```

**Real-world advice:** Use `RESTRICT` on delete (you rarely want cascading deletes) and `CASCADE` on update (if an ID changes, propagate it).

### Many-to-Many: Prescriptions

```sql
-- Medications table
CREATE TABLE medications (
    medication_id   INT         NOT NULL AUTO_INCREMENT,
    name            VARCHAR(100) NOT NULL,
    generic_name    VARCHAR(100),
    category        VARCHAR(50),
    PRIMARY KEY (medication_id)
);

-- Junction table: patient_medications (Many-to-Many between patients and medications)
CREATE TABLE prescriptions (
    prescription_id INT         NOT NULL AUTO_INCREMENT,
    patient_id      INT         NOT NULL,
    medication_id   INT         NOT NULL,
    doctor_id       INT         NOT NULL,
    dosage          VARCHAR(50),
    frequency       VARCHAR(50),  -- "twice daily", "as needed"
    start_date      DATE        NOT NULL,
    end_date        DATE,
    notes           TEXT,
    
    PRIMARY KEY (prescription_id),
    FOREIGN KEY (patient_id)    REFERENCES patients(patient_id)     ON DELETE RESTRICT,
    FOREIGN KEY (medication_id) REFERENCES medications(medication_id) ON DELETE RESTRICT,
    FOREIGN KEY (doctor_id)     REFERENCES doctors(doctor_id)       ON DELETE RESTRICT
);
```

> **Junction Table Pattern:** Many-to-Many relationships are always resolved with a third table that holds the foreign keys of both tables. This junction table can also carry *attributes of the relationship* (like dosage and frequency — things that describe the *prescription*, not just the patient or the medication).

---

## 9. JOINs

### The "Combining Files" Analogy

Imagine you have two filing cabinets side by side. One has customer folders, the other has order folders. Each order folder has a customer ID written on it. When you want to see "Ahmed's orders," you pick up Ahmed's customer folder and all order folders that say "Ahmed's ID." That's a JOIN.

### Setup: Insert Sample Data

```sql
INSERT INTO doctors (first_name, last_name, specialty, license_no, email) VALUES
    ('Dr. Asif',  'Mirza',    'Cardiology',   'LIC001', 'asif.mirza@hospital.com'),
    ('Dr. Hina',  'Baig',     'Neurology',    'LIC002', 'hina.baig@hospital.com'),
    ('Dr. Tariq', 'Javed',    'Orthopedics',  'LIC003', 'tariq.javed@hospital.com');

INSERT INTO patients (first_name, last_name, date_of_birth, gender, city) VALUES
    ('Ahmed',  'Khan',    '1990-05-15', 'M', 'Karachi'),
    ('Fatima', 'Ali',     '1985-11-23', 'F', 'Lahore'),
    ('Omar',   'Sheikh',  '1992-07-08', 'M', 'Islamabad');

INSERT INTO appointments (patient_id, doctor_id, scheduled_at, status) VALUES
    (1, 1, '2024-03-01 09:00:00', 'completed'),
    (1, 2, '2024-03-15 11:00:00', 'scheduled'),
    (2, 1, '2024-03-05 14:00:00', 'completed'),
    (3, 3, '2024-03-10 10:30:00', 'cancelled');
```

### INNER JOIN — The Most Common Join

Returns only rows where there's a match in BOTH tables.

```sql
-- See all appointments WITH patient and doctor names
SELECT 
    a.appointment_id,
    CONCAT(p.first_name, ' ', p.last_name) AS patient_name,
    CONCAT(d.first_name, ' ', d.last_name) AS doctor_name,
    d.specialty,
    a.scheduled_at,
    a.status
FROM appointments a
INNER JOIN patients p ON a.patient_id = p.patient_id
INNER JOIN doctors  d ON a.doctor_id  = d.doctor_id
ORDER BY a.scheduled_at;
```

The `ON` clause specifies *how* the tables connect — which columns match up. The table aliases (`a`, `p`, `d`) keep things readable.

### LEFT JOIN — Keep All Left Table Rows

Returns all rows from the left table, plus matching rows from the right table. If no match, the right side columns are NULL.

```sql
-- Find ALL patients, and show their latest appointment (if any)
-- Patients with no appointments will still appear, with NULL appointment fields
SELECT 
    p.first_name,
    p.last_name,
    a.scheduled_at,
    a.status
FROM patients p
LEFT JOIN appointments a ON p.patient_id = a.patient_id
ORDER BY p.patient_id;
```

**Use LEFT JOIN when you want:** "Show me all X, and if they have related Y data, show that too."

```sql
-- Find patients who have NEVER had an appointment
SELECT p.first_name, p.last_name
FROM patients p
LEFT JOIN appointments a ON p.patient_id = a.patient_id
WHERE a.appointment_id IS NULL;
```

This is a classic pattern: LEFT JOIN + WHERE right_table.id IS NULL = "find orphaned records."

### RIGHT JOIN

Mirror of LEFT JOIN — keeps all rows from the right table. Rarely used in practice (you can always rewrite as a LEFT JOIN by switching table order).

### FULL OUTER JOIN

Returns all rows from both tables. MySQL doesn't support this directly — you simulate it:

```sql
-- Simulate FULL OUTER JOIN in MySQL
SELECT p.patient_id, p.first_name, a.appointment_id
FROM patients p
LEFT JOIN appointments a ON p.patient_id = a.patient_id

UNION

SELECT p.patient_id, p.first_name, a.appointment_id
FROM patients p
RIGHT JOIN appointments a ON p.patient_id = a.patient_id;
```

### CROSS JOIN — The Cartesian Product

Combines every row in table A with every row in table B. Rarely used, but useful for generating combinations.

```sql
-- Generate all possible doctor-patient combinations
SELECT d.first_name AS doctor, p.first_name AS patient
FROM doctors d
CROSS JOIN patients p;
-- 3 doctors × 3 patients = 9 rows
```

### SELF JOIN — A Table Joining Itself

```sql
-- Employees table with a manager_id that references the same table
CREATE TABLE employees (
    emp_id      INT         NOT NULL AUTO_INCREMENT,
    name        VARCHAR(100),
    manager_id  INT,  -- FK to employees(emp_id)
    salary      DECIMAL(10,2),
    PRIMARY KEY (emp_id),
    FOREIGN KEY (manager_id) REFERENCES employees(emp_id)
);

INSERT INTO employees (name, manager_id, salary) VALUES
    ('CEO Hassan',   NULL,  500000),
    ('VP Ahmed',     1,     300000),
    ('VP Sara',      1,     280000),
    ('Dev Omar',     2,     150000),
    ('Dev Bilal',    2,     140000);

-- Find each employee and their manager's name
SELECT 
    e.name        AS employee,
    m.name        AS manager,
    e.salary
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.emp_id
ORDER BY e.emp_id;
```

### JOIN Cheat Sheet

```
INNER JOIN  : Only rows with matches in BOTH tables
LEFT JOIN   : All left rows + matching right rows (nulls if no match)
RIGHT JOIN  : All right rows + matching left rows (nulls if no match)
CROSS JOIN  : Every combination (cartesian product)
SELF JOIN   : Table joins itself (for hierarchical data)
```

---

## 10. Aggregate Functions & GROUP BY

### The "Summarize a Spreadsheet" Analogy

If you had a spreadsheet of 10,000 sales records, you might ask: "What's the total sales per city?" or "What's the average order value per customer?" That's exactly what aggregate functions + GROUP BY do.

### Core Aggregate Functions

```sql
-- COUNT: How many rows?
SELECT COUNT(*) AS total_patients FROM patients;
SELECT COUNT(email) AS patients_with_email FROM patients;  -- Ignores NULLs
SELECT COUNT(DISTINCT city) AS unique_cities FROM patients;

-- SUM, AVG, MIN, MAX
SELECT 
    SUM(salary)     AS total_payroll,
    AVG(salary)     AS average_salary,
    MIN(salary)     AS lowest_salary,
    MAX(salary)     AS highest_salary
FROM employees;
```

### GROUP BY — Aggregating by Category

```sql
-- How many patients per city?
SELECT city, COUNT(*) AS patient_count
FROM patients
GROUP BY city
ORDER BY patient_count DESC;

-- How many appointments per doctor?
SELECT 
    CONCAT(d.first_name, ' ', d.last_name) AS doctor_name,
    d.specialty,
    COUNT(a.appointment_id)                 AS appointment_count
FROM doctors d
LEFT JOIN appointments a ON d.doctor_id = a.doctor_id
GROUP BY d.doctor_id, d.first_name, d.last_name, d.specialty
ORDER BY appointment_count DESC;

-- Average salary by department (from our employees table)
SELECT 
    manager_id,
    COUNT(*)        AS team_size,
    AVG(salary)     AS avg_salary,
    SUM(salary)     AS total_salary
FROM employees
WHERE manager_id IS NOT NULL
GROUP BY manager_id;
```

### HAVING — Filter After Aggregation

`WHERE` filters rows before aggregation. `HAVING` filters groups after aggregation.

```sql
-- Cities with MORE than 1 patient
SELECT city, COUNT(*) AS patient_count
FROM patients
GROUP BY city
HAVING patient_count > 1;  -- Can't use COUNT(*) in WHERE; use HAVING

-- The rule of thumb:
-- WHERE  filters individual rows  (before GROUP BY)
-- HAVING filters groups           (after GROUP BY)

-- Find doctors with more than 2 completed appointments
SELECT 
    d.doctor_id,
    CONCAT(d.first_name, ' ', d.last_name) AS doctor_name,
    COUNT(a.appointment_id) AS completed_count
FROM doctors d
JOIN appointments a ON d.doctor_id = a.doctor_id
WHERE a.status = 'completed'        -- Filter rows BEFORE grouping
GROUP BY d.doctor_id
HAVING completed_count >= 2         -- Filter groups AFTER grouping
ORDER BY completed_count DESC;
```

### Query Execution Order

Understanding this order prevents many common SQL errors:

```
1. FROM      — Which tables?
2. JOIN      — Combine tables
3. WHERE     — Filter individual rows
4. GROUP BY  — Group the filtered rows
5. HAVING    — Filter the groups
6. SELECT    — Choose which columns to return
7. DISTINCT  — Remove duplicates
8. ORDER BY  — Sort the results
9. LIMIT     — Return only N rows
```

This is why you can't use an alias defined in SELECT inside a WHERE clause — WHERE runs before SELECT!

---

## 11. Subqueries

### Queries Inside Queries

A subquery is a SELECT statement nested inside another query. Think of it like asking someone: "Give me a list of patients whose city is the same as where our most popular doctor works."

```sql
-- Find patients from the same city as the most recently registered patient
SELECT first_name, last_name, city
FROM patients
WHERE city = (
    SELECT city 
    FROM patients 
    ORDER BY registered_at DESC 
    LIMIT 1
);
```

### Subquery in WHERE

```sql
-- Find all appointments for patients from Karachi
SELECT * FROM appointments
WHERE patient_id IN (
    SELECT patient_id 
    FROM patients 
    WHERE city = 'Karachi'
);

-- Find patients who have had more appointments than the average
SELECT first_name, last_name
FROM patients
WHERE patient_id IN (
    SELECT patient_id
    FROM appointments
    GROUP BY patient_id
    HAVING COUNT(*) > (
        SELECT AVG(appt_count) 
        FROM (
            SELECT COUNT(*) AS appt_count 
            FROM appointments 
            GROUP BY patient_id
        ) AS sub
    )
);
```

### Correlated Subqueries

A correlated subquery references a column from the outer query — it runs once per row of the outer query.

```sql
-- Find each patient's most recent appointment
SELECT 
    p.first_name, 
    p.last_name,
    (SELECT MAX(a.scheduled_at) 
     FROM appointments a 
     WHERE a.patient_id = p.patient_id) AS last_appointment
FROM patients p;
```

### Subquery in FROM (Derived Tables)

```sql
-- Use a subquery as a temporary table
SELECT dept_summary.specialty, dept_summary.avg_salary
FROM (
    SELECT specialty, AVG(salary) AS avg_salary
    FROM doctors
    JOIN employees ON doctors.doctor_id = employees.emp_id  -- hypothetical
    GROUP BY specialty
) AS dept_summary
WHERE dept_summary.avg_salary > 200000;
```

### Common Table Expressions (CTEs) — WITH Clause

CTEs are like named subqueries — cleaner and reusable. Available in MySQL 8.0+.

```sql
-- Using a CTE to find high-appointment patients
WITH patient_appt_counts AS (
    SELECT 
        patient_id,
        COUNT(*) AS appt_count
    FROM appointments
    GROUP BY patient_id
),
active_patients AS (
    SELECT patient_id, first_name, last_name
    FROM patients
    WHERE is_active = 1
)
SELECT 
    ap.first_name,
    ap.last_name,
    COALESCE(pac.appt_count, 0) AS appointments
FROM active_patients ap
LEFT JOIN patient_appt_counts pac ON ap.patient_id = pac.patient_id
ORDER BY appointments DESC;
```

---

## 12. Indexes

### The Library Index Card Analogy

Imagine a library with 1 million books, unsorted, in no order. Finding a book would take hours. But libraries have two systems:
1. **Card catalog / Index system:** Look up by title, author, subject → get shelf location → go directly there.
2. **No index:** Walk through every shelf looking at every book (called a "full table scan" in databases).

An **index** is a separate data structure that MySQL maintains to find rows quickly without scanning the entire table.

### How Indexes Work (B-Tree)

MySQL's default index type is a **B-Tree** (Balanced Tree). Picture a sorted, hierarchical tree where:
- Each node contains index values and pointers
- Searching narrows down from the root to leaf nodes
- Finding a specific value takes O(log n) time instead of O(n)

```sql
-- Without index: MySQL reads EVERY row to find matching emails
SELECT * FROM patients WHERE email = 'ahmed.khan@email.com';
-- Scans all 1,000,000 rows: slow

-- With index on email: MySQL traverses the B-tree
-- Finds the value in ~20 comparisons (log₂(1,000,000) ≈ 20): fast
```

### Types of Indexes

```sql
-- PRIMARY KEY — automatically creates a unique clustered index
-- (Data is physically sorted by this key on disk)
PRIMARY KEY (patient_id)

-- UNIQUE INDEX — ensures no duplicates, enables fast lookup
CREATE UNIQUE INDEX idx_email ON patients(email);
-- Or: ALTER TABLE patients ADD UNIQUE INDEX idx_email (email);

-- Regular INDEX — fastest lookup, duplicates allowed
CREATE INDEX idx_city ON patients(city);
CREATE INDEX idx_last_name ON patients(last_name);

-- COMPOSITE INDEX — index on multiple columns
CREATE INDEX idx_city_gender ON patients(city, gender);
-- This helps queries like: WHERE city = 'Karachi' AND gender = 'F'
-- Also helps: WHERE city = 'Karachi'  (uses leftmost prefix)
-- Does NOT help: WHERE gender = 'F'   (leftmost column not used)

-- FULLTEXT INDEX — for text search
CREATE FULLTEXT INDEX idx_notes ON appointments(notes);
-- Used with: WHERE MATCH(notes) AGAINST('chest pain' IN BOOLEAN MODE)
```

### Viewing & Dropping Indexes

```sql
-- See all indexes on a table
SHOW INDEX FROM patients;

-- Drop an index
DROP INDEX idx_city ON patients;
ALTER TABLE patients DROP INDEX idx_city;
```

### The EXPLAIN Command — Seeing MySQL's Query Plan

`EXPLAIN` shows you how MySQL plans to execute a query — a crucial debugging tool.

```sql
EXPLAIN SELECT * FROM patients WHERE city = 'Karachi';
```

Key columns in EXPLAIN output:

| Column | What It Means |
|---|---|
| `type` | How the table is scanned (`ALL` = bad, `ref` = good, `const` = best) |
| `key` | Which index was used (NULL = no index) |
| `rows` | Estimated rows MySQL will examine |
| `Extra` | Additional info (`Using filesort`, `Using index`, etc.) |

```sql
-- Bad: type=ALL, key=NULL, rows=1000000
EXPLAIN SELECT * FROM patients WHERE city = 'Karachi';

-- Add the index
CREATE INDEX idx_city ON patients(city);

-- Good: type=ref, key=idx_city, rows=50
EXPLAIN SELECT * FROM patients WHERE city = 'Karachi';
```

### When to Use Indexes (and When Not To)

**Create indexes on:**
- Primary keys (automatic)
- Foreign key columns (almost always)
- Columns frequently used in WHERE clauses
- Columns used in JOIN ON conditions
- Columns used in ORDER BY for large tables

**Avoid indexes on:**
- Columns with very few distinct values (e.g., gender: only M/F — index barely helps)
- Very small tables (full scan is faster than index lookup)
- Columns that are updated extremely frequently (index must be updated on every write)
- Columns rarely queried

**The trade-off:** Every index speeds up reads but slows down writes (INSERT/UPDATE/DELETE must update all indexes). A table with 20 indexes will have very fast reads but painfully slow writes.

### Covering Index

A covering index contains all columns needed by a query — MySQL never needs to read the actual table row.

```sql
-- Query needs: city (WHERE) and last_name (SELECT)
SELECT last_name FROM patients WHERE city = 'Karachi';

-- A covering index on (city, last_name) satisfies this entirely from the index
CREATE INDEX idx_city_lastname ON patients(city, last_name);
-- EXPLAIN will show: "Using index" — never touches the table itself
```

---

## 13. ACID Properties

### The Bank Transfer Analogy

ACID is the set of guarantees that make database transactions reliable. Without ACID, databases would be chaotic and untrustworthy.

Imagine you're transferring PKR 50,000 from Account A to Account B:

1. Deduct 50,000 from Account A
2. Add 50,000 to Account B

What if the server crashes between steps 1 and 2? Without ACID, 50,000 just vanishes. With ACID, either both steps happen or neither does.

---

### A — Atomicity

**"All or nothing"**

A transaction is treated as a single unit. Either ALL operations succeed, or NONE of them are applied. If anything fails midway, the database is rolled back to its state before the transaction started.

**Analogy:** Sending a package. Either it arrives complete, or it's returned. You never get a half-delivered package.

```sql
START TRANSACTION;
    UPDATE accounts SET balance = balance - 50000 WHERE account_id = 1;
    UPDATE accounts SET balance = balance + 50000 WHERE account_id = 2;
COMMIT;  -- Only if BOTH succeed

-- If anything fails between START and COMMIT:
ROLLBACK;  -- Both changes are undone
```

---

### C — Consistency

**"Data is always valid"**

A transaction must bring the database from one valid state to another valid state. It cannot violate defined rules (constraints, foreign keys, triggers).

**Analogy:** A chess game. Each move must result in a valid board state. You can't leave the king in check.

```sql
-- This FAILS because of the NOT NULL constraint — consistency enforced
INSERT INTO patients (first_name, last_name) VALUES (NULL, 'Khan');
-- ERROR: Column 'first_name' cannot be null

-- This FAILS because of the FOREIGN KEY constraint
INSERT INTO appointments (patient_id, doctor_id, scheduled_at)
VALUES (9999, 1, NOW());
-- ERROR: patient_id 9999 doesn't exist
```

---

### I — Isolation

**"Transactions don't interfere with each other"**

Concurrent transactions execute as if they were running serially. One transaction cannot see uncommitted changes made by another.

**Analogy:** Two bank tellers handling different customers simultaneously. Each teller works from a consistent snapshot of account data and their changes don't interfere.

**Isolation Levels in MySQL (from weakest to strongest):**

```
READ UNCOMMITTED : Can see other transactions' uncommitted changes (dirty reads possible)
READ COMMITTED   : Only sees committed data (prevents dirty reads)
REPEATABLE READ  : Same query returns same results within a transaction (MySQL default)
SERIALIZABLE     : Full isolation, transactions run as if serial (slowest, safest)
```

```sql
-- Check current isolation level
SELECT @@transaction_isolation;

-- Set isolation level for the session
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

**Common Isolation Problems:**
- **Dirty Read:** Reading uncommitted changes from another transaction
- **Non-repeatable Read:** Re-reading a row gets different data (another transaction changed it)
- **Phantom Read:** Re-running a query gets different rows (another transaction inserted/deleted)

---

### D — Durability

**"Committed data survives failures"**

Once a transaction is committed, the data is permanently saved — even if the server crashes immediately after. MySQL achieves this through write-ahead logging (the InnoDB redo log).

**Analogy:** Once you send a signed contract via courier and get a delivery receipt, the contract is delivered — even if the courier company later has a problem. The delivery is done and permanent.

```sql
-- This data is durable after COMMIT
START TRANSACTION;
    INSERT INTO patients (first_name, last_name, date_of_birth, gender)
    VALUES ('New', 'Patient', '1995-01-01', 'M');
COMMIT;  -- Now on disk, survives power failure
```

### Summary Table

| Property | Guarantee | Mechanism |
|---|---|---|
| Atomicity | All or nothing | ROLLBACK, transaction log |
| Consistency | Valid state transitions | Constraints, triggers |
| Isolation | Transactions don't interfere | Locks, MVCC |
| Durability | Committed data persists | Write-ahead log, disk flush |

---

## 14. Transactions

### What is a Transaction?

A transaction is a sequence of SQL operations treated as a single logical unit of work. MySQL's default engine (InnoDB) supports full ACID transactions.

**MySQL's Auto-commit Mode:** By default, every SQL statement is its own transaction (auto-committed). To group multiple statements:

```sql
-- Method 1: Explicit transaction
START TRANSACTION;
    -- ... your SQL statements ...
COMMIT;   -- Save changes
-- or
ROLLBACK; -- Undo changes

-- Method 2: Disable auto-commit
SET autocommit = 0;
    -- ... your SQL statements ...
COMMIT;
SET autocommit = 1;
```

### Real-World Example: Hospital Bill Payment

```sql
-- Tables needed
CREATE TABLE invoices (
    invoice_id      INT         NOT NULL AUTO_INCREMENT,
    patient_id      INT         NOT NULL,
    total_amount    DECIMAL(12,2) NOT NULL,
    paid_amount     DECIMAL(12,2) DEFAULT 0,
    status          ENUM('unpaid','partial','paid') DEFAULT 'unpaid',
    created_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (invoice_id),
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
);

CREATE TABLE payments (
    payment_id      INT         NOT NULL AUTO_INCREMENT,
    invoice_id      INT         NOT NULL,
    amount          DECIMAL(12,2) NOT NULL,
    payment_method  ENUM('cash','card','insurance') NOT NULL,
    paid_at         TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (payment_id),
    FOREIGN KEY (invoice_id) REFERENCES invoices(invoice_id)
);

-- Process a payment (must be atomic)
START TRANSACTION;

    -- Step 1: Record the payment
    INSERT INTO payments (invoice_id, amount, payment_method)
    VALUES (1, 5000.00, 'cash');
    
    -- Step 2: Update the invoice
    UPDATE invoices
    SET 
        paid_amount = paid_amount + 5000.00,
        status = CASE 
            WHEN paid_amount + 5000.00 >= total_amount THEN 'paid'
            ELSE 'partial'
        END
    WHERE invoice_id = 1;

COMMIT;
-- Both changes happen together or not at all
```

### SAVEPOINT — Partial Rollback

```sql
START TRANSACTION;

    INSERT INTO patients (first_name, last_name, date_of_birth, gender)
    VALUES ('Test1', 'Patient', '2000-01-01', 'M');
    
    SAVEPOINT after_first_insert;  -- Checkpoint
    
    INSERT INTO patients (first_name, last_name, date_of_birth, gender)
    VALUES ('Test2', 'Patient', '2000-01-01', 'F');
    
    -- Something went wrong with the second insert
    ROLLBACK TO SAVEPOINT after_first_insert;  -- Undo only from savepoint
    
    -- First insert is still pending
COMMIT;  -- Only first patient is saved
```

### Deadlocks

A **deadlock** occurs when two transactions are each waiting for the other to release a lock.

```
Transaction A: Locks row 1, waits for row 2
Transaction B: Locks row 2, waits for row 1
→ Both wait forever (deadlock)
```

MySQL automatically detects deadlocks and kills one transaction (the "victim"). The application should retry the killed transaction.

```sql
-- How to minimize deadlocks:
-- 1. Access tables/rows in the same order across transactions
-- 2. Keep transactions short
-- 3. Use appropriate indexes (reduce lock scope)
-- 4. Use lower isolation levels where appropriate
```

---

## 15. Normalization

### The "No Redundancy" Principle

Normalization is the process of organizing a database to reduce redundancy and improve data integrity. It follows a series of rules called **Normal Forms (NF)**.

**The Problem — An Unnormalized Table:**

```
orders_bad:
| order_id | customer_name | customer_email      | customer_city | product1  | qty1 | product2  | qty2 |
|----------|---------------|---------------------|---------------|-----------|------|-----------|------|
| 1        | Ahmed Khan    | ahmed@email.com     | Karachi       | Laptop    | 1    | Mouse     | 2    |
| 2        | Ahmed Khan    | ahmed@email.com     | Karachi       | Keyboard  | 1    |           |      |
| 3        | Fatima Ali    | fatima@email.com    | Lahore        | Monitor   | 1    | Laptop    | 1    |
```

Problems:
- Ahmed's email and city are repeated in every order — **update anomaly** (change email in one place, forget another)
- No way to add a 3rd product without adding columns — **insertion anomaly**
- Delete an order → lose the customer's email — **deletion anomaly**
- What if an order has 10 products? You need 20 more columns — **inflexible structure**

---

### First Normal Form (1NF)

**Rule:** Each column holds atomic (indivisible) values. No repeating groups. Each row is unique.

```sql
-- 1NF violation: storing multiple values in one column
order_products: "Laptop, Mouse, Keyboard"  -- BAD: comma-separated list

-- 1NF violation: repeating groups
| product1 | qty1 | product2 | qty2 |  -- BAD: repeating column groups

-- 1NF compliant:
CREATE TABLE order_items (
    order_item_id   INT AUTO_INCREMENT PRIMARY KEY,
    order_id        INT NOT NULL,
    product_name    VARCHAR(100),
    quantity        INT
);
-- Each product gets its own row — atomic, no repeating groups
```

---

### Second Normal Form (2NF)

**Rule:** Must be in 1NF, AND every non-key column must depend on the ENTIRE primary key (not just part of it). This only applies to tables with composite primary keys.

```sql
-- 2NF violation: order_items with composite PK (order_id, product_id)
order_items:
| order_id | product_id | quantity | product_name | product_price |
|          |            |          | ↑ depends on product_id only (partial dependency!)

-- Fix: split into two tables
CREATE TABLE order_items (
    order_id    INT,
    product_id  INT,
    quantity    INT,      -- Depends on BOTH order_id AND product_id ✓
    PRIMARY KEY (order_id, product_id)
);

CREATE TABLE products (
    product_id      INT AUTO_INCREMENT PRIMARY KEY,
    product_name    VARCHAR(100),  -- Depends on product_id only ✓
    product_price   DECIMAL(10,2)
);
```

---

### Third Normal Form (3NF)

**Rule:** Must be in 2NF, AND no non-key column should depend on another non-key column (no transitive dependencies).

```sql
-- 3NF violation:
customers:
| customer_id | name  | city     | country  | country_code |
|             |       |          | ← country_code depends on country, not customer_id!

-- Fix: Extract country data
CREATE TABLE countries (
    country_code    CHAR(2)     PRIMARY KEY,
    country_name    VARCHAR(100) NOT NULL
);

CREATE TABLE customers (
    customer_id     INT         AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(100),
    city            VARCHAR(100),
    country_code    CHAR(2),
    FOREIGN KEY (country_code) REFERENCES countries(country_code)
);
-- Now every column in customers depends ONLY on customer_id ✓
```

---

### Boyce-Codd Normal Form (BCNF)

A stricter version of 3NF. For every functional dependency X → Y, X must be a superkey (can uniquely identify a row). Handles edge cases that 3NF misses with composite keys.

---

### Normalized Hospital Schema

```sql
-- After full normalization, our hospital has these clean tables:

-- patients (patient_id is PK; all columns describe the patient)
-- doctors  (doctor_id is PK; all columns describe the doctor)
-- departments (dept_id is PK)
-- appointments (appointment_id PK; patient_id and doctor_id are FKs)
-- medications (medication_id is PK)
-- prescriptions (junction table: patient_id, medication_id, doctor_id as FKs)
-- invoices (invoice_id PK, patient_id FK)
-- payments (payment_id PK, invoice_id FK)

-- Each table has one clear purpose. No redundancy. No anomalies.
```

---

### Denormalization — When to Break the Rules

Normalization is the ideal, but sometimes you **intentionally denormalize** for performance:

```sql
-- Normalized: To get order totals, you join order_items and products, then sum
-- Many joins slow down analytical queries on large datasets

-- Denormalized: Store a pre-calculated total on the orders table
ALTER TABLE orders ADD COLUMN total_amount DECIMAL(12,2);
-- Update it via trigger or application code whenever items change
-- Faster to read, but must keep in sync — a conscious trade-off
```

Denormalization is common in **data warehouses** and reporting systems where read speed is critical.

---

## 16. Views

### The "Window into Data" Analogy

A **view** is a saved SQL query that you can treat like a table. It's a virtual table — it doesn't store data itself, it just stores the query. When you query a view, MySQL runs the underlying query.

**Analogy:** A view is like a window in a building. The window doesn't contain the outside world — it just gives you a specific, framed view of it. You see the current state, not a snapshot.

```sql
-- Create a view: simplified patient info for front desk staff
CREATE VIEW patient_summary AS
SELECT 
    p.patient_id,
    CONCAT(p.first_name, ' ', p.last_name)  AS full_name,
    p.phone,
    p.email,
    p.city,
    COUNT(a.appointment_id)                  AS total_appointments,
    MAX(a.scheduled_at)                      AS last_appointment
FROM patients p
LEFT JOIN appointments a ON p.patient_id = a.patient_id
WHERE p.is_active = 1
GROUP BY p.patient_id;

-- Now query the view like a regular table
SELECT full_name, phone, last_appointment
FROM patient_summary
WHERE city = 'Karachi'
ORDER BY last_appointment DESC;
```

### Why Use Views?

**Security:** Grant users access to a view (showing only safe columns) without giving them access to the underlying tables.

```sql
-- Create a restricted view that hides sensitive data
CREATE VIEW patient_public_info AS
SELECT patient_id, first_name, last_name, city
FROM patients;
-- No email, phone, or date_of_birth visible

-- Grant access to the view only
GRANT SELECT ON hospital_db.patient_public_info TO 'front_desk_user'@'%';
```

**Simplicity:** Complex joins stored once, queried simply.

**Consistency:** All applications use the same view, ensuring consistent business logic.

```sql
-- Modify a view
CREATE OR REPLACE VIEW patient_summary AS
SELECT patient_id, CONCAT(first_name, ' ', last_name) AS full_name
FROM patients
WHERE is_active = 1;

-- Drop a view
DROP VIEW patient_summary;

-- Show all views in the database
SHOW FULL TABLES WHERE Table_type = 'VIEW';
```

---

## 17. Stored Procedures & Functions

### The "Reusable Recipe" Analogy

Instead of writing the same complex SQL repeatedly, store it as a named procedure you can call with parameters — like saving a recipe you cook often.

### Stored Procedures

```sql
-- Change delimiter so MySQL doesn't get confused by semicolons inside the procedure
DELIMITER $$

CREATE PROCEDURE GetPatientHistory(IN p_patient_id INT)
BEGIN
    -- Patient info
    SELECT 
        CONCAT(first_name, ' ', last_name) AS patient_name,
        date_of_birth,
        city
    FROM patients
    WHERE patient_id = p_patient_id;
    
    -- Their appointments
    SELECT 
        a.scheduled_at,
        CONCAT(d.first_name, ' ', d.last_name) AS doctor,
        d.specialty,
        a.status,
        a.notes
    FROM appointments a
    JOIN doctors d ON a.doctor_id = d.doctor_id
    WHERE a.patient_id = p_patient_id
    ORDER BY a.scheduled_at DESC;
END $$

DELIMITER ;

-- Call the procedure
CALL GetPatientHistory(1);
```

### Procedure with OUT parameter

```sql
DELIMITER $$

CREATE PROCEDURE GetAppointmentCount(
    IN  p_patient_id    INT,
    OUT p_count         INT
)
BEGIN
    SELECT COUNT(*) INTO p_count
    FROM appointments
    WHERE patient_id = p_patient_id AND status = 'completed';
END $$

DELIMITER ;

-- Usage
CALL GetAppointmentCount(1, @count);
SELECT @count AS completed_appointments;
```

### Stored Functions

Functions return a single value and can be used inside SELECT statements.

```sql
DELIMITER $$

CREATE FUNCTION CalculateAge(p_birth_date DATE)
RETURNS INT
DETERMINISTIC
BEGIN
    RETURN TIMESTAMPDIFF(YEAR, p_birth_date, CURDATE());
END $$

DELIMITER ;

-- Use in a query
SELECT first_name, last_name, CalculateAge(date_of_birth) AS age
FROM patients
ORDER BY age DESC;
```

### Triggers — Automatic Actions

A trigger fires automatically when a specified event (INSERT, UPDATE, DELETE) occurs on a table.

```sql
-- Audit log table
CREATE TABLE audit_log (
    log_id      INT         AUTO_INCREMENT PRIMARY KEY,
    table_name  VARCHAR(50),
    action      VARCHAR(10),
    record_id   INT,
    changed_at  TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    changed_by  VARCHAR(100)
);

-- Trigger: log every patient update
DELIMITER $$

CREATE TRIGGER after_patient_update
AFTER UPDATE ON patients
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (table_name, action, record_id, changed_by)
    VALUES ('patients', 'UPDATE', NEW.patient_id, USER());
END $$

DELIMITER ;

-- Now every UPDATE on patients automatically logs to audit_log
```

---

## 18. CAP Theorem

### The "Distributed Systems Trilemma"

The **CAP Theorem** (Brewer's Theorem, 2000) states that a distributed data store can only guarantee **two** of the following three properties simultaneously:

### C — Consistency

Every read receives the most recent write or an error. All nodes in the distributed system see the same data at the same time.

**Analogy:** A bank's ledger. When you check your balance at any ATM, you always see the exact current balance — no stale data.

### A — Availability

Every request receives a (non-error) response — but it might not be the most recent data. The system is always up and responding.

**Analogy:** A social media like counter. It might show "1,203 likes" when the actual current count is "1,207" (a few nodes are slightly behind). But the page never goes down.

### P — Partition Tolerance

The system continues operating even when network partitions occur (some nodes can't communicate with others due to network failure).

**Analogy:** Two hospitals in different cities. If the network connection between them goes down, each can still operate independently. The question is: do they show potentially outdated shared records (available) or refuse to serve until connected (consistent)?

### The Trade-Off

In real distributed systems, **P (Partition Tolerance) is non-negotiable** — networks DO fail. So the real choice is:

```
CP Systems (Consistency + Partition Tolerance):
- Sacrifice availability when a partition occurs
- Returns error rather than stale data
- Examples: HBase, MongoDB (in strong consistency mode), Zookeeper
- Use when: Banking, financial transactions, anything where stale data = disaster

AP Systems (Availability + Partition Tolerance):
- Always responds, but might return stale data
- Sacrifice consistency during partitions
- Examples: Cassandra, DynamoDB, CouchDB
- Use when: Social media counts, product catalogs, DNS
```

### Where Does MySQL Fit?

A **single MySQL server** is not distributed, so CAP theorem doesn't directly apply. But:

- MySQL with synchronous replication → CP behavior
- MySQL with asynchronous replication → AP behavior (reads might return stale data)
- MySQL InnoDB Cluster with PAXOS → CP

**Real-world example:** A fintech startup uses MySQL for all transactional data (CP — no stale money) and Cassandra for activity feeds and notifications (AP — it's OK if a notification is slightly delayed).

---

## 19. Query Optimization & EXPLAIN

### The Three-Step Optimization Process

**Step 1: Measure, don't guess.** Find the actual slow queries.

```sql
-- Enable slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;  -- Log queries taking > 1 second
SET GLOBAL slow_query_log_file = '/var/log/mysql/slow.log';

-- See currently running queries
SHOW PROCESSLIST;

-- Show query execution statistics
SHOW STATUS LIKE 'Handler_read%';
-- Handler_read_rnd_next: high value = lots of full table scans = needs indexes
```

**Step 2: Use EXPLAIN to understand the query plan.**

```sql
-- Basic EXPLAIN
EXPLAIN SELECT * FROM patients WHERE city = 'Karachi' AND gender = 'F';

-- EXPLAIN FORMAT=JSON gives more detail (MySQL 5.6+)
EXPLAIN FORMAT=JSON SELECT * FROM patients WHERE city = 'Karachi';

-- EXPLAIN ANALYZE actually runs the query and shows real vs estimated stats (MySQL 8.0+)
EXPLAIN ANALYZE SELECT * FROM patients WHERE city = 'Karachi';
```

**EXPLAIN output — what to look for:**

```
type column (best to worst):
  system  → Table has one row
  const   → Primary key lookup (fastest)
  eq_ref  → JOIN using primary key
  ref     → Index lookup (good)
  range   → Index range scan (OK)
  index   → Full index scan (mediocre)
  ALL     → Full table scan (worst — add an index!)

rows column: Estimated rows to examine. Lower is better.
Extra column warning signs:
  "Using filesort"   → No index for ORDER BY (slow for large tables)
  "Using temporary"  → Creating a temp table (slow)
```

**Step 3: Optimize.**

```sql
-- Optimization 1: Add missing indexes
EXPLAIN SELECT * FROM appointments WHERE patient_id = 1 AND status = 'completed';
-- If no index on (patient_id, status):
CREATE INDEX idx_appt_patient_status ON appointments(patient_id, status);

-- Optimization 2: Avoid functions on indexed columns in WHERE
-- BAD: Function prevents index use
SELECT * FROM patients WHERE YEAR(date_of_birth) = 1990;

-- GOOD: Use range comparison instead
SELECT * FROM patients WHERE date_of_birth BETWEEN '1990-01-01' AND '1990-12-31';

-- Optimization 3: Use EXISTS instead of IN for subqueries (often faster)
-- Less optimal
SELECT * FROM patients WHERE patient_id IN (SELECT patient_id FROM appointments);

-- More optimal for large datasets
SELECT * FROM patients p WHERE EXISTS (
    SELECT 1 FROM appointments a WHERE a.patient_id = p.patient_id
);

-- Optimization 4: LIMIT early
-- BAD: Sort all million rows, then take 10
SELECT * FROM patients ORDER BY registered_at DESC LIMIT 10;
-- (Already fast if index exists on registered_at)

-- Optimization 5: Avoid SELECT *
-- BAD: Fetches all columns including large TEXT columns
SELECT * FROM appointments;

-- GOOD: Only what you need
SELECT appointment_id, scheduled_at, status FROM appointments;
```

---

## 20. Security Best Practices

### The "Principle of Least Privilege"

Each user/application should have only the permissions it needs — nothing more.

```sql
-- Create a read-only user for reporting
CREATE USER 'reporter'@'localhost' IDENTIFIED BY 'strong_password_here';
GRANT SELECT ON hospital_db.* TO 'reporter'@'localhost';

-- Create an app user with only what the app needs
CREATE USER 'app_user'@'%' IDENTIFIED BY 'another_strong_password';
GRANT SELECT, INSERT, UPDATE ON hospital_db.patients TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE ON hospital_db.appointments TO 'app_user'@'%';
GRANT SELECT ON hospital_db.doctors TO 'app_user'@'%';
-- No DELETE, no DROP, no access to payments table

-- View grants
SHOW GRANTS FOR 'app_user'@'%';

-- Revoke a permission
REVOKE DELETE ON hospital_db.patients FROM 'app_user'@'%';

-- Remove a user
DROP USER 'old_user'@'localhost';
```

### SQL Injection Prevention

SQL injection is the #1 database security vulnerability. It happens when user input is directly concatenated into a SQL query.

```python
# VULNERABLE (Python example — never do this)
user_input = "' OR '1'='1"
query = f"SELECT * FROM patients WHERE email = '{user_input}'"
# Becomes: SELECT * FROM patients WHERE email = '' OR '1'='1'
# Returns ALL patients!

# SAFE: Use parameterized queries (prepared statements)
cursor.execute("SELECT * FROM patients WHERE email = %s", (user_input,))
# The input is treated as data, not SQL — safe!
```

In MySQL directly:

```sql
-- Prepared statements in MySQL
PREPARE stmt FROM 'SELECT * FROM patients WHERE email = ?';
SET @email = 'ahmed@email.com';
EXECUTE stmt USING @email;
DEALLOCATE PREPARE stmt;
```

### Other Security Practices

```sql
-- 1. Always hash passwords (never store plain text)
-- Use bcrypt or Argon2 at the application layer
-- If you must hash in MySQL (not recommended for passwords):
SELECT SHA2('password', 256);  -- Use for checksums, not passwords

-- 2. Encrypt sensitive columns
-- Use MySQL's AES functions for sensitive data (not a substitute for app-layer encryption)
INSERT INTO patients (first_name, ssn_encrypted)
VALUES ('Ahmed', AES_ENCRYPT('12345-6789', 'encryption_key'));

SELECT first_name, AES_DECRYPT(ssn_encrypted, 'encryption_key') AS ssn
FROM patients;

-- 3. Enable SSL/TLS for connections
-- In my.cnf:
-- [mysqld]
-- require_secure_transport = ON

-- 4. Regular backups
-- mysqldump -u root -p hospital_db > backup_$(date +%Y%m%d).sql

-- 5. Audit logging
-- Enable the audit plugin in enterprise MySQL
-- or use triggers to log sensitive operations (as shown in triggers section)
```

---

## 21. Real-World Project: E-Commerce Database

Let's put everything together and build a simplified e-commerce database for a Pakistani online store.

### Requirements

- Customers can register and manage their addresses
- Products are organized in categories
- Customers place orders containing multiple products
- Orders go through a status workflow
- Payments are tracked
- Full audit trail

### Complete Schema

```sql
CREATE DATABASE ecommerce_pk CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ecommerce_pk;

-- Customers
CREATE TABLE customers (
    customer_id     INT             NOT NULL AUTO_INCREMENT,
    email           VARCHAR(100)    NOT NULL UNIQUE,
    password_hash   VARCHAR(255)    NOT NULL,
    first_name      VARCHAR(50)     NOT NULL,
    last_name       VARCHAR(50)     NOT NULL,
    phone           VARCHAR(20),
    is_verified     TINYINT(1)      DEFAULT 0,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (customer_id)
);

-- Customer addresses (One customer, many addresses)
CREATE TABLE addresses (
    address_id      INT             NOT NULL AUTO_INCREMENT,
    customer_id     INT             NOT NULL,
    label           VARCHAR(50),        -- "Home", "Office"
    address_line1   VARCHAR(200)    NOT NULL,
    address_line2   VARCHAR(200),
    city            VARCHAR(100)    NOT NULL,
    province        VARCHAR(50),
    postal_code     VARCHAR(10),
    is_default      TINYINT(1)      DEFAULT 0,
    PRIMARY KEY (address_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);

-- Product categories (self-referencing for nested categories)
CREATE TABLE categories (
    category_id     INT             NOT NULL AUTO_INCREMENT,
    name            VARCHAR(100)    NOT NULL,
    parent_id       INT,                -- NULL = top-level category
    slug            VARCHAR(100)    NOT NULL UNIQUE,
    PRIMARY KEY (category_id),
    FOREIGN KEY (parent_id) REFERENCES categories(category_id)
);

-- Products
CREATE TABLE products (
    product_id      INT             NOT NULL AUTO_INCREMENT,
    category_id     INT             NOT NULL,
    name            VARCHAR(200)    NOT NULL,
    slug            VARCHAR(200)    NOT NULL UNIQUE,
    description     TEXT,
    price           DECIMAL(12,2)   NOT NULL,
    sale_price      DECIMAL(12,2),
    stock_qty       INT             NOT NULL DEFAULT 0,
    weight_kg       DECIMAL(6,3),
    is_active       TINYINT(1)      DEFAULT 1,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (product_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    INDEX idx_category (category_id),
    INDEX idx_price    (price),
    INDEX idx_active   (is_active),
    FULLTEXT INDEX idx_search (name, description)
);

-- Orders
CREATE TABLE orders (
    order_id        INT             NOT NULL AUTO_INCREMENT,
    customer_id     INT             NOT NULL,
    address_id      INT             NOT NULL,
    status          ENUM('pending','confirmed','processing','shipped','delivered','cancelled','refunded')
                                    DEFAULT 'pending',
    subtotal        DECIMAL(12,2)   NOT NULL,
    shipping_cost   DECIMAL(8,2)    DEFAULT 0,
    discount        DECIMAL(8,2)    DEFAULT 0,
    total_amount    DECIMAL(12,2)   NOT NULL,
    notes           TEXT,
    ordered_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (order_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (address_id)  REFERENCES addresses(address_id),
    INDEX idx_customer (customer_id),
    INDEX idx_status   (status),
    INDEX idx_ordered  (ordered_at)
);

-- Order items (Many-to-Many: orders and products)
CREATE TABLE order_items (
    item_id         INT             NOT NULL AUTO_INCREMENT,
    order_id        INT             NOT NULL,
    product_id      INT             NOT NULL,
    quantity        INT             NOT NULL,
    unit_price      DECIMAL(12,2)   NOT NULL,  -- Price at time of order (snapshot)
    total_price     DECIMAL(12,2)   NOT NULL,  -- quantity × unit_price
    PRIMARY KEY (item_id),
    FOREIGN KEY (order_id)   REFERENCES orders(order_id)   ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    INDEX idx_order   (order_id),
    INDEX idx_product (product_id)
);

-- Payments
CREATE TABLE order_payments (
    payment_id      INT             NOT NULL AUTO_INCREMENT,
    order_id        INT             NOT NULL,
    amount          DECIMAL(12,2)   NOT NULL,
    method          ENUM('cod','easypaisa','jazzcash','card','bank_transfer') NOT NULL,
    status          ENUM('pending','completed','failed','refunded') DEFAULT 'pending',
    transaction_ref VARCHAR(100),
    paid_at         TIMESTAMP,
    PRIMARY KEY (payment_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
```

### Key Business Queries

```sql
-- 1. Place an order (transactional)
START TRANSACTION;

    -- Create order
    INSERT INTO orders (customer_id, address_id, subtotal, total_amount)
    VALUES (1, 1, 5499.00, 5799.00);  -- subtotal + shipping
    
    SET @new_order_id = LAST_INSERT_ID();
    
    -- Add items
    INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price)
    VALUES (@new_order_id, 101, 2, 1500.00, 3000.00),
           (@new_order_id, 205, 1, 2499.00, 2499.00);
    
    -- Reduce stock
    UPDATE products SET stock_qty = stock_qty - 2 WHERE product_id = 101;
    UPDATE products SET stock_qty = stock_qty - 1 WHERE product_id = 205;
    
    -- Check no stock went negative
    IF (SELECT MIN(stock_qty) FROM products WHERE product_id IN (101, 205)) < 0 THEN
        ROLLBACK;
    ELSE
        COMMIT;
    END IF;

-- 2. Dashboard: Today's sales summary
SELECT 
    COUNT(DISTINCT o.order_id)          AS total_orders,
    COUNT(DISTINCT o.customer_id)       AS unique_customers,
    SUM(o.total_amount)                 AS gross_revenue,
    SUM(oi.quantity)                    AS items_sold,
    AVG(o.total_amount)                 AS avg_order_value
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
WHERE DATE(o.ordered_at) = CURDATE()
  AND o.status NOT IN ('cancelled', 'refunded');

-- 3. Top 10 best-selling products this month
SELECT 
    p.name                          AS product,
    c.name                          AS category,
    SUM(oi.quantity)                AS units_sold,
    SUM(oi.total_price)             AS revenue
FROM order_items oi
JOIN products p  ON oi.product_id  = p.product_id
JOIN categories c ON p.category_id = c.category_id
JOIN orders o    ON oi.order_id    = o.order_id
WHERE o.ordered_at >= DATE_FORMAT(NOW(), '%Y-%m-01')  -- First day of current month
  AND o.status NOT IN ('cancelled', 'refunded')
GROUP BY p.product_id
ORDER BY units_sold DESC
LIMIT 10;

-- 4. Customer lifetime value (LTV)
SELECT 
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name)  AS customer_name,
    COUNT(DISTINCT o.order_id)               AS total_orders,
    SUM(o.total_amount)                      AS lifetime_value,
    AVG(o.total_amount)                      AS avg_order_value,
    MAX(o.ordered_at)                        AS last_order_date,
    DATEDIFF(CURDATE(), MAX(o.ordered_at))   AS days_since_last_order
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
    AND o.status NOT IN ('cancelled', 'refunded')
GROUP BY c.customer_id
ORDER BY lifetime_value DESC;

-- 5. Products low in stock (reorder alert)
SELECT 
    p.product_id,
    p.name,
    p.stock_qty,
    COALESCE(SUM(oi.quantity), 0)            AS sold_last_30_days
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.order_id
    AND o.ordered_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    AND o.status NOT IN ('cancelled', 'refunded')
WHERE p.is_active = 1
GROUP BY p.product_id
HAVING p.stock_qty < 10  -- Less than 10 units
ORDER BY sold_last_30_days DESC;  -- Prioritize fast-moving items

-- 6. Search products by text (using FULLTEXT index)
SELECT product_id, name, price
FROM products
WHERE MATCH(name, description) AGAINST('wireless headphones bluetooth' IN BOOLEAN MODE)
  AND is_active = 1
ORDER BY price ASC;
```

---

## Quick Reference

### SQL Commands Cheat Sheet

```sql
-- DDL (Data Definition Language) — structure
CREATE DATABASE db_name;
CREATE TABLE table_name (col1 TYPE CONSTRAINTS, ...);
ALTER TABLE t ADD COLUMN col TYPE;
ALTER TABLE t MODIFY COLUMN col TYPE;
DROP TABLE table_name;
TRUNCATE TABLE table_name;

-- DML (Data Manipulation Language) — data
INSERT INTO t (col1, col2) VALUES (v1, v2);
SELECT cols FROM t WHERE cond ORDER BY col LIMIT n;
UPDATE t SET col = val WHERE cond;
DELETE FROM t WHERE cond;

-- DCL (Data Control Language) — permissions
GRANT priv ON db.table TO 'user'@'host';
REVOKE priv ON db.table FROM 'user'@'host';

-- TCL (Transaction Control Language)
START TRANSACTION;
COMMIT;
ROLLBACK;
SAVEPOINT name;
```

### Decision Guide

| Scenario | Solution |
|---|---|
| Need fast lookups on a column | Add an INDEX |
| Money/currency values | DECIMAL(x, 2), never FLOAT |
| "Delete" but keep history | Soft delete: `deleted_at` column |
| Multiple operations that must all succeed | TRANSACTION |
| Complex join you run often | VIEW |
| Validate data before insert | CONSTRAINTS (NOT NULL, UNIQUE, CHECK, FK) |
| Data changing slowly, analytics heavy | Consider denormalization |
| Slow query | EXPLAIN first, then add indexes |
| Many small tables with FK links | Normalize (3NF) |
| Binary flags / yes-no columns | TINYINT(1) or BOOLEAN |
| Text you need to search | FULLTEXT INDEX |

### Normal Forms Summary

| Normal Form | Rule |
|---|---|
| 1NF | Atomic values, no repeating groups, unique rows |
| 2NF | 1NF + no partial dependencies (non-key columns depend on full PK) |
| 3NF | 2NF + no transitive dependencies (non-key columns don't depend on each other) |
| BCNF | 3NF + every determinant is a superkey |

### ACID at a Glance

| Letter | Property | Guarantee |
|---|---|---|
| A | Atomicity | All or nothing |
| C | Consistency | Always valid state |
| I | Isolation | Transactions don't interfere |
| D | Durability | Committed data survives crashes |

### CAP Theorem at a Glance

| | Available? | Consistent? | Partition Tolerant? |
|---|---|---|---|
| CP system | No (rejects requests during partition) | Yes | Yes |
| AP system | Yes | No (may return stale data) | Yes |
| CA system | Yes | Yes | No (doesn't exist in real distributed systems) |

---

## What's Next?

You've covered the full beginner-to-intermediate journey. Here's what to explore next:

**Intermediate → Advanced topics:**
- **Window Functions** — `ROW_NUMBER()`, `RANK()`, `LAG()`, `LEAD()` for powerful analytics
- **Partitioning** — Split huge tables into smaller physical partitions for performance
- **Replication** — Primary/Replica setup for read scaling and high availability
- **InnoDB Internals** — Buffer pool, redo log, MVCC, row-level locking
- **Query Cache & Optimizer Hints** — Force MySQL to use specific indexes
- **JSON Functions** — Full JSON manipulation with `JSON_EXTRACT()`, `JSON_SET()`, etc.
- **Full-Text Search** — Advanced `MATCH AGAINST` patterns
- **Database Sharding** — Horizontal scaling patterns
- **MySQL Performance Schema** — Deep performance monitoring

**Practice projects:**
1. Build a complete blog platform (users, posts, categories, tags, comments)
2. Build an inventory management system
3. Build a simple analytics dashboard with aggregation queries
4. Build a multi-tenant SaaS schema

**Tools to learn:**
- **MySQL Workbench** — GUI for design, queries, and administration
- **DBeaver** — Universal database GUI
- **Percona Toolkit** — Advanced MySQL management and optimization tools
- **phpMyAdmin** — Web-based MySQL administration

---

*Guide covers MySQL 8.0+ with InnoDB storage engine. Most concepts apply to MySQL 5.7+ and are compatible with MariaDB.*