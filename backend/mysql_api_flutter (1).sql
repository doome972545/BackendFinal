-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 15, 2024 at 05:04 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mysql_api_flutter`
--

-- --------------------------------------------------------

--
-- Table structure for table `added_patient_to_doctor`
--

CREATE TABLE `added_patient_to_doctor` (
  `id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctor_and_admin_table`
--

CREATE TABLE `doctor_and_admin_table` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0,
  `isDoctor` tinyint(1) NOT NULL DEFAULT 0,
  `isNurse` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor_and_admin_table`
--

INSERT INTO `doctor_and_admin_table` (`id`, `firstname`, `lastname`, `email`, `password`, `isAdmin`, `isDoctor`, `isNurse`) VALUES
(1, 'doctor', 'doctor', 'doctor@gmail.com', 'd123', 0, 1, 0),
(6, 'admin', 'admin', 'admin@gmail.com', 'ad123', 1, 0, 0),
(7, 'nurse', 'nurse', 'nurse@gmail.com', 'n123', 0, 0, 1),
(8, 'user', 'user', 'user@gmail.com', 'u123', 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `health_data`
--

CREATE TABLE `health_data` (
  `health_id` int(11) NOT NULL,
  `id` int(11) DEFAULT NULL,
  `blood_pressure` varchar(15) DEFAULT NULL,
  `blood_sugar` varchar(10) DEFAULT NULL,
  `blood_oxygen` varchar(10) DEFAULT NULL,
  `temperature` decimal(5,2) DEFAULT NULL,
  `record_date` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `health_data`
--

INSERT INTO `health_data` (`health_id`, `id`, `blood_pressure`, `blood_sugar`, `blood_oxygen`, `temperature`, `record_date`) VALUES
(23, 1, '10', '14', '30', 30.00, '2024-01-12'),
(24, 2, '10', '14', '30', 30.00, '2024-01-12');

-- --------------------------------------------------------

--
-- Table structure for table `id_card_information`
--

CREATE TABLE `id_card_information` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `id_number` varchar(20) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `added` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `id_card_information`
--

INSERT INTO `id_card_information` (`id`, `first_name`, `last_name`, `id_number`, `date_of_birth`, `gender`, `address`, `added`) VALUES
(1, 'ชญานนท์', 'อุตราชา', '1449600009770', '2002-07-09', 'ชาย', '26/8 บ้านแห่เหนือ ต.หนองบอน อ.โกสุมพิสัย จ.มหาสารคาม', 1),
(2, 'ชญานนท์', 'อุตราชา', '1449600009788', '2002-07-09', 'ชาย', '26/8 บ้านแห่เหนือ ต.หนองบอน อ.โกสุมพิสัย จ.มหาสารคาม', 0),
(4, 'ฟำพเฟำ', 'พเฟำพเฟำพ', '23523423', '2024-01-02', 'ชาย', '3tagergaergaerg', 0),
(5, 'ชื่อ1', 'นามสกุล1', '1234567890123', '1989-12-31', 'ชาย', 'ที่อยู่1d', 0);

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `image` longtext NOT NULL DEFAULT 'No image'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sleep_data`
--

CREATE TABLE `sleep_data` (
  `sleep_id` int(11) NOT NULL,
  `id` int(11) DEFAULT NULL,
  `sleep_time` varchar(20) DEFAULT NULL,
  `record_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sleep_data`
--

INSERT INTO `sleep_data` (`sleep_id`, `id`, `sleep_time`, `record_date`) VALUES
(13, 1, '8', '2024-01-09 13:02:35'),
(14, 2, '8', '2024-01-09 13:03:17'),
(15, NULL, '8', '2024-01-09 13:03:34'),
(16, NULL, '8', '2024-01-09 13:03:47'),
(17, 2, '8', '2024-01-09 13:04:02'),
(18, 2, '08:30:00', '2024-01-09 13:04:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `added_patient_to_doctor`
--
ALTER TABLE `added_patient_to_doctor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `doctor_and_admin_table`
--
ALTER TABLE `doctor_and_admin_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `health_data`
--
ALTER TABLE `health_data`
  ADD PRIMARY KEY (`health_id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `id_card_information`
--
ALTER TABLE `id_card_information`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sleep_data`
--
ALTER TABLE `sleep_data`
  ADD PRIMARY KEY (`sleep_id`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `added_patient_to_doctor`
--
ALTER TABLE `added_patient_to_doctor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `doctor_and_admin_table`
--
ALTER TABLE `doctor_and_admin_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `health_data`
--
ALTER TABLE `health_data`
  MODIFY `health_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `id_card_information`
--
ALTER TABLE `id_card_information`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `sleep_data`
--
ALTER TABLE `sleep_data`
  MODIFY `sleep_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `added_patient_to_doctor`
--
ALTER TABLE `added_patient_to_doctor`
  ADD CONSTRAINT `doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `doctor_and_admin_table` (`id`),
  ADD CONSTRAINT `patient_id` FOREIGN KEY (`patient_id`) REFERENCES `id_card_information` (`id`);

--
-- Constraints for table `health_data`
--
ALTER TABLE `health_data`
  ADD CONSTRAINT `helthy_data` FOREIGN KEY (`id`) REFERENCES `id_card_information` (`id`);

--
-- Constraints for table `sleep_data`
--
ALTER TABLE `sleep_data`
  ADD CONSTRAINT `sleep_user` FOREIGN KEY (`id`) REFERENCES `id_card_information` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
