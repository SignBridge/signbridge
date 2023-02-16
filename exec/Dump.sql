-- MySQL dump 10.19  Distrib 10.3.37-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	10.3.37-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `board` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,'aaaaaa','aaaaa'),(2,'ddd','dddddd'),(3,'aa','aaaa'),(4,'mmmmmm','mmmmmmm'),(5,'zzzzzzzz','zzzzzzzzzzz');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (44,'choiseongmin','$2a$10$vOMOVxRnj.kYhpbg/aSKmO5OoAfL9MNkqSEqeQ4Ygx76det3.64lC','choiseongmin','aa@naver.com',0,'Translator'),(45,'aa','$2a$10$tqXbN5bjG8BO9TUPRGZopuBOgoU1ZtERtUxu5bazY39Ltdpo9qbvK','aa','dddd@naver.com',0,'Translator'),(46,'string','$2a$10$dsa1v6juKPEO0ZCeKGDn4uZMEqf3Op0V3oP0Os56HQEwBWH918SFS','edit','edit@naver.com',0,'string'),(47,'test','$2a$10$Wla/RRTwkQduRfoGgunId.KOv5TuF4R5amc8QN9.qnT3kgR6K0dym','test','test@naver.com',1,'ADMIN'),(49,'aaa','$2a$10$foOH5hqp8qgjcBlka55M..6sg8.rNX6nf7kz5mKtaLWNRR7mZ/T/S','choiseongmin','aa@naver.com',0,'Translator'),(50,'bb','$2a$10$x4FrsL2zuWVh.Td8RVgosOdsCqcN7bH/czOg3qxuwGN0Huy/TXO82','choiseongmin','aa@naver.com',0,'Translator'),(51,'kk','$2a$10$FFB/1NU0rVqynE1KxLDPx.tgdmwPllOMd972o1QpaRhLz6HkYVFEq','choiseongmin','aa@naver.com',0,'Translator'),(52,'test1','$2a$10$demrJLXpRj/w5BHgGgOZSugUqul2RtCdiyLslq3.BEhyiSb4wP3ji','choiseongmin','aa@naver.com',0,'Translator'),(53,'test2','$2a$10$CSELUQTylLfW/pJW6ZhjkuQ1e/gCRoJaGGJ1m3lwEdNi59Nnqejqy','choiseongmin','aa@naver.com',1,'Translator'),(54,'test3','$2a$10$GgFbio3SKGRnp2GetbOMmOPUJPNNqwhOXnmQ7n/oYtF8J7QHTwwIK','choiseongmin','aa@naver.com',1,'Translator'),(55,'test4','$2a$10$N/wJRg0mdgnZZUqtmyCOJeCkohR1UavZ93G.yB9rI8qyxSk.hvZIu','choiseongmin','aa@naver.com',1,'Translator'),(56,'test5','$2a$10$cxE8Fnn4nA.QdS.bWZbOZ.LTYO99sQsHKGdBwcikn4NjHs4ivOFjO','choiseongmin','aa@naver.com',1,'Translator');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-16 16:25:12
