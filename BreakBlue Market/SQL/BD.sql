create database if not exists `BreakBlueMarket`;
use `BreakBlueMarket`;

DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto` (
	`id` int(11) NOT NULL auto_increment,
    `nombre` varchar(50) NOT NULL,
    `precio` float(10) NOT NULL,
    `marca` varchar(50) NOT NULL,
    `descripcion` varchar(500) NOT NULL,
    `unidadesDisponibles` int NOT NULL,
    `imagen` varchar(2000) NOT NULL,
    `calificacion` float(10) NOT NULL,
    `comentario` varchar(500) NOT NULL,
    `correo` varchar(500) NOT NULL,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`correo`) REFERENCES comprador(`correo`),
    FOREIGN KEY (`correo`) REFERENCES vendedor(`correo`),
    UNIQUE(`id`)
    ) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

DROP TABLE IF EXISTS `imagen`;
CREATE TABLE `imagen` (
	`id` int(11) NOT NULL auto_increment,
    `imagen` varchar(2000) NOT NULL,

    PRIMARY KEY (`id`),
    UNIQUE(`id`)
    ) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

DROP TABLE IF EXISTS `comprador`;
CREATE TABLE `comprador` (
	`correo` varchar(50) NOT NULL,
	`nombre` varchar(50) NOT NULL,
    `apellidos` varchar(50) NOT NULL,
    `contrasena` varchar(255) NOT NULL,
    `nombreUsuario` varchar(10) NOT NULL,

    PRIMARY KEY (`correo`),
    UNIQUE(`correo`)
    ) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

DROP TABLE IF EXISTS `vendedor`;
CREATE TABLE `vendedor` (
	`correo` varchar(50) NOT NULL,
	`nombre` varchar(50) NOT NULL,
    `apellidos` varchar(50) NOT NULL,
    `contrasena` varchar(8) NOT NULL,
    `nombreUsuario` varchar(10) NOT NULL,

    PRIMARY KEY (`correo`),
    UNIQUE(`correo`)
    ) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;


    SELECT * FROM producto;
    SELECT * FROM comprador;
    SELECT * FROM vendedor;
    SELECT * FROM imagen;

	INSERT INTO `producto` VALUES (1, 'Celular', 20.00, 'Apple', 'Bonito celular 100% calidad', 11, '/home/vianey/Descargas/sample1.jpg', 4.2, 'Estuvo bien chafa, muy pirata', 'micorreito@feliz.com');
	INSERT INTO `imagen` VALUES (1, '/home/vianey/Descargas/sample1.jpg');
	INSERT INTO `comprador` VALUES ('micorreito@correo.com', 'Rory', 'García', 'pas123', 'rorgar');
	INSERT INTO `vendedor` VALUES ('vendedor@correo.com', 'Maria', 'García', 'mipass', 'mary123');
<<<<<<< HEAD
    
    UPDATE producto
    SET unidadesDisponibles = 200 WHERE 'id'='1'
=======
>>>>>>> ddc56064f7920acf61d58f70b12bda63f483e2e5
