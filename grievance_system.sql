-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 18, 2024 at 08:44 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grievance_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat_messages`
--

CREATE TABLE `chat_messages` (
  `id` int(11) NOT NULL,
  `grievance_id` int(11) DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chat_messages`
--

INSERT INTO `chat_messages` (`id`, `grievance_id`, `sender_id`, `message`) VALUES
(1, 1, 1, 'how many days reqquired '),
(2, 2, 2, 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `grievances`
--

CREATE TABLE `grievances` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `description` text NOT NULL,
  `status` enum('open','in-progress','resolved') DEFAULT 'open',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `resolution_deadline` timestamp NOT NULL DEFAULT (current_timestamp() + interval 24 hour)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grievances`
--

INSERT INTO `grievances` (`id`, `employee_id`, `description`, `status`, `timestamp`, `resolution_deadline`) VALUES
(1, 1, 'Related to salary', 'open', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 2, 'leave', 'open', '2024-01-17 19:40:38', '2024-01-18 19:40:38'),
(3, 3, 'approval for leave', 'open', '2024-01-17 19:41:53', '2024-01-18 19:41:53'),
(5, 4, 'update on sports activities ', 'open', '2024-01-18 07:27:14', '2024-01-19 07:27:14');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('employee','HR') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(1, 'amit', '$2b$10$dDEJHT/2lNM69r1X6bZIwepN0mRTm91xPKOAk/mvolmWsQybnTYRy', 'employee'),
(2, 'Ankit', '$2b$10$tsL1pGAxfuQzGL1NBaP4y.NOcDNQMkSvJnCBCEhWejBzJk1xuBhFK', 'HR'),
(3, 'rohit', '$2b$10$W9InSdlgCPxaGyYjMfwnMe/PeLmLdltASA6dBUhP4sgGkfG1m7UFG', 'employee'),
(4, 'Abhishek', '$2b$10$D0Z4FgdH8BvSRUpRr8xzjuz7H9Klc4njFntafqNN79pwiXnr01pNu', 'HR');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grievance_id` (`grievance_id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- Indexes for table `grievances`
--
ALTER TABLE `grievances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat_messages`
--
ALTER TABLE `chat_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `grievances`
--
ALTER TABLE `grievances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD CONSTRAINT `chat_messages_ibfk_1` FOREIGN KEY (`grievance_id`) REFERENCES `grievances` (`id`),
  ADD CONSTRAINT `chat_messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `grievances`
--
ALTER TABLE `grievances`
  ADD CONSTRAINT `grievances_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
