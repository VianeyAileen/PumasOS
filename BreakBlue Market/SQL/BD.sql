create database if not exists `BreakBlueMarket`;
use `BreakBlueMarket`;

DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto` (
	`id` int(11) NOT NULL auto_increment,
    `nombre` varchar(50) NOT NULL,
    `precio` float(10) NOT NULL,
    `marca` varchar(50) NOT NULL,
    `descripcion` varchar(500) NOT NULL,
    `unidadesDisponibles` boolean NOT NULL,
    `imagen` longblob NOT NULL,
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
    `imagen` longblob NOT NULL,
    
    PRIMARY KEY (`id`),
    UNIQUE(`id`)
    ) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;
    
DROP TABLE IF EXISTS `comprador`;
CREATE TABLE `comprador` (
	`correo` varchar(50) NOT NULL,
	`nombre` varchar(50) NOT NULL,
    `apellidos` varchar(50) NOT NULL,
    `contrasena` varchar(8) NOT NULL,
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
    
DROP TABLE IF EXISTS `genero`;
CREATE TABLE `genero` (
	`correo` varchar(50) NOT NULL,
	`genero` varchar(10) NOT NULL,
    
    PRIMARY KEY (`correo`),
    UNIQUE(`correo`)
    ) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;
    
DROP TABLE IF EXISTS `tipoUsuario`;
CREATE TABLE `tipoUsuario` (
	`correo` varchar(50) NOT NULL,
	`tipoUsuario` varchar(20) NOT NULL,
    
    PRIMARY KEY (`correo`),
    UNIQUE(`correo`)
    ) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;
    
    SELECT * FROM producto;
    SELECT * FROM comprador;
    SELECT * FROM vendedor;
    SELECT * FROM imagen;
    SELECT * FROM genero;
    SELECT * FROM tipoUsuario;
    
	INSERT INTO `producto` VALUES (1, 'Celular', 20.00, 'Apple', 'Bonito celular 100% calidad', 11, '/home/vianey/Descargas/sample1.jpg', 4.2, 'Estuvo bien chafa, muy pirata', 'micorreito@feliz.com');