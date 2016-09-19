-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 19, 2016 at 04:08 PM
-- Server version: 5.7.15-0ubuntu0.16.04.1
-- PHP Version: 7.0.8-0ubuntu0.16.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crud`
--

-- --------------------------------------------------------

--
-- Table structure for table `victims`
--

CREATE TABLE `victims` (
  `id` int(11) UNSIGNED NOT NULL,
  `no` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `gender` enum('t','f','m') NOT NULL,
  `address` text NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `status` enum('open','yts','progress','closed') NOT NULL,
  `date` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `victims`
--

INSERT INTO `victims` (`id`, `no`, `name`, `gender`, `address`, `mobile`, `location`, `status`, `date`) VALUES
(64, 9, 'Kavi8', 'm', 'pudupet road', '9789231303', 'Chennai', 'yts', '2014-02-03'),
(65, 1, 'Kavi0', 'm', 'pudupet road', '9789231303', 'Chennai', 'yts', '2014-02-03'),
(57, 4, 'Kavi9', 'm', 'pudupet road', '9789231303', 'Chennai', 'yts', '2014-02-03'),
(58, 3, 'Kavi1', 'm', 'pudupet road', '9789231303', 'Chennai', 'yts', '2014-02-03'),
(59, 7, 'Kavi7', 'm', 'pudupet road', '9789231303', 'Chennai', 'yts', '2014-02-03'),
(60, 6, 'Kavi9', 'm', 'pudupet road', '9789231303', 'Chennai', 'yts', '2014-02-03'),
(61, 9, 'Kavi5', 'm', 'pudupet road', '9789231303', 'Chennai', 'yts', '2014-02-03'),
(62, 10, 'Kavi1', 'm', 'pudupet road', '9789231303', 'Chennai', 'yts', '2014-02-03'),
(63, 8, 'Kavi1', 'm', 'pudupet road', '9789231303', 'Chennai', 'yts', '2014-02-03'),
(55, 5, 'Kavi3', 'm', 'pudupet road', '9789231303', 'Chennai', 'yts', '2014-02-03'),
(56, 10, 'Kavi0', 'm', 'pudupet road', '9789231303', 'Chennai', 'yts', '2014-02-03'),
(45, 2, 'Kaviarasan K K', 'm', '4, Pudupet Road,', '9789231303', 'Cennai', 'progress', '2018-02-02'),
(46, 10, 'Kavi8', 'm', 'pudupet road', '9789231303', 'Chennai', 'yts', '2014-02-03'),
(47, 5, 'Kavi6', 'm', 'pudupet road', '9789231303', 'Chennai', 'yts', '2014-02-03'),
(48, 8, 'Kavi7', 'm', 'pudupet road', '9789231303', 'Chennai', 'yts', '2014-02-03'),
(49, 1, 'Kavi9', 'm', 'pudupet road', '9789231303', 'Chennai', 'yts', '2014-02-03'),
(50, 7, 'Kavi5', 'm', 'pudupet road', '9789231303', 'Chennai', 'yts', '2014-02-03'),
(51, 10, 'Kavi9', 'm', 'pudupet road', '9789231303', 'Chennai', 'yts', '2014-02-03'),
(52, 5, 'Kavi10', 'm', 'pudupet road', '9789231303', 'Chennai', 'yts', '2014-02-03'),
(53, 2, 'Kavi9', 'm', 'pudupet road', '9789231303', 'Chennai', 'yts', '2014-02-03'),
(54, 3, 'Kavi10', 'm', 'pudupet road', '9789231303', 'Chennai', 'yts', '2014-02-03'),
(66, 0, 'Kavi6', 'm', 'pudupet road', '9789231303', 'Chennai', 'yts', '2014-02-03'),
(67, 10, 'Kavi9', 'm', 'pudupet road', '9789231303', 'Chennai', 'yts', '2014-02-03'),
(68, 3, 'Kavi10', 'm', 'pudupet road', '9789231303', 'Chennai', 'yts', '2014-02-03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `victims`
--
ALTER TABLE `victims`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `victims`
--
ALTER TABLE `victims`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
