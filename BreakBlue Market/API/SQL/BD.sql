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
    `correo` varchar(500) NOT NULL,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`correo`) REFERENCES comprador(`correo`),
    FOREIGN KEY (`correo`) REFERENCES vendedor(`correo`),
    UNIQUE(`id`)
    ) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

DROP TABLE IF EXISTS `imagen`;
CREATE TABLE `imagen` (
	`id` int(11) NOT NULL auto_increment,
    `nombre` varchar(2000) NOT NULL
    
    FOREIGN KEY imagen(`id`) REFERENCES producto(`id`)
    ) ENGINE=MyISAM DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `comentario`;
CREATE TABLE `comentario` (
	`id` int(11) NOT NULL auto_increment,
    `comentario` varchar(2000) NOT NULL,

	FOREIGN KEY comentario(`id`) REFERENCES producto(`id`)
    ) ENGINE=MyISAM DEFAULT CHARSET=latin1 ;
    
DROP TABLE IF EXISTS `calificacion`;
CREATE TABLE `calificacion` (
	`id` int(11) NOT NULL auto_increment,
    `calificacion` float(10) NOT NULL,
    
	FOREIGN KEY calificacion(`id`) REFERENCES producto(`id`)
    ) ENGINE=MyISAM DEFAULT CHARSET=latin1 ;

DROP TABLE IF EXISTS `comprador`;
CREATE TABLE `comprador` (
	`correo` varchar(50) NOT NULL,
	`nombre` varchar(50) NOT NULL,
    `apellidos` varchar(50) NOT NULL,
    `contrasena` varchar(255) NOT NULL,
    `nombreUsuario` varchar(20) NOT NULL,

    PRIMARY KEY (`correo`),
    UNIQUE(`correo`)
    ) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

DROP TABLE IF EXISTS `vendedor`;
CREATE TABLE `vendedor` (
	`correo` varchar(50) NOT NULL,
	`nombre` varchar(50) NOT NULL,
    `apellidos` varchar(50) NOT NULL,
    `contrasena` varchar(255) NOT NULL,
    `nombreUsuario` varchar(20) NOT NULL,

    PRIMARY KEY (`correo`),
    UNIQUE(`correo`)
    ) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;


    SELECT * FROM producto;
    SELECT * FROM imagen;
    SELECT * FROM comentario;
    SELECT * FROM calificacion;
    SELECT * FROM comprador;
    SELECT * FROM vendedor;
    
    INSERT INTO `producto` (`nombre`,`precio`,`marca`,`descripcion`,`unidadesDisponibles`, `correo`)
    VALUES ('Celular', 11000.00, 'Iphone', 'Bonito celular nuevo 100% calidad (no es clon)', 10, 'misalvaje14@gmail.com');
    INSERT INTO `producto` (`nombre`,`precio`,`marca`,`descripcion`,`unidadesDisponibles`, `correo`)
    VALUES ('Computadora', 10000.00, 'HP', 'Computadora HP nueva con SSD de 250 GB', 2, 'micorreito@gmail.com');
    INSERT INTO `producto` (`nombre`,`precio`,`marca`,`descripcion`,`unidadesDisponibles`, `correo`)
    VALUES ('PlayStation5', 20000.00, 'Sony', 'Consola de playstation 5 nueva ultimo modelo', 5, 'misalvaje14@gmail.com');
	INSERT INTO `producto` (`nombre`,`precio`,`marca`,`descripcion`,`unidadesDisponibles`, `correo`)
    VALUES ('Reloj', 500.00, 'Timex', 'Bonito reloj timex, muy preciso en los segundos', 20, 'elbuendicter@gmail.com');
	
     
    INSERT INTO vendedor (`correo`, `nombre`, `apellidos`, `contrasena`,`nombreUsuario`)
    VALUES ('misalvaje14@gmail.com', 'Jesus', 'Rodriguez Figueroa', 'JeRoFi', 'Jesus14');
    INSERT INTO vendedor (`correo`, `nombre`, `apellidos`, `contrasena`,`nombreUsuario`)
    VALUES ('micorreito@gmail.com', 'Jose', 'Garcia Santamaria', 'Pepegrillo', 'Pepegrillo1999');
    INSERT INTO vendedor (`correo`, `nombre`, `apellidos`, `contrasena`,`nombreUsuario`)
    VALUES ('elbuendicter@gmail.com', 'Dicter', 'Tadeo', 'mimejoramigoestoño', 'TadeoDicter');
    
    INSERT INTO comprador (`correo`, `nombre`, `apellidos`, `contrasena`,`nombreUsuario`)
    VALUES ('toño@gmail.com', 'Antonio', 'Sandoval', 'Antony', 'ToñocomprasLocas');
    INSERT INTO comprador (`correo`, `nombre`, `apellidos`, `contrasena`,`nombreUsuario`)
    VALUES ('borras@gmail.com', 'Aylen', 'Pablito', 'vianey', 'PablitoBorras');
	INSERT INTO comprador (`correo`, `nombre`, `apellidos`, `contrasena`,`nombreUsuario`)
    VALUES ('santana@gmail.com', 'Jose', 'Garcia Santamaria', 'Pepe1234', 'SantanaGS');
    
    
    INSERT INTO imagen (`id`, `imagen`) 
    VALUES (1, "../../assets/img/play1.jpg");
    INSERT INTO imagen (`id`, `imagen`) 
    VALUES (1, "../../assets/img/play2.jpg");
    INSERT INTO imagen (`id`, `imagen`) 
    VALUES (2, "../../assets/img/reloj1.jpg");
    INSERT INTO imagen (`id`, `imagen`) 
    VALUES (3, "../../assets/img/Celular1.jpg");
    INSERT INTO imagen (`id`, `imagen`) 
    VALUES (4, "../../assets/img/computadora1.jpg");
    
    INSERT INTO comentario (`id`, `comentario`) 
    VALUES (1, "Excelente Juego de playstation, muy buenos graficos");
    INSERT INTO comentario (`id`, `comentario`) 
    VALUES (2, "Bonito reloj muy indispensable");
    INSERT INTO comentario (`id`, `comentario`) 
    VALUES (3, "Bonito celular eficiente, no se traba");
    INSERT INTO comentario (`id`, `comentario`) 
    VALUES (3, "Excelente celular me salvo de apuros y es muy resistente");
    INSERT INTO comentario (`id`, `comentario`) 
    VALUES (4, "No se traba la computadora, 100% efectiva");
    INSERT INTO comentario (`id`, `comentario`) 
    VALUES (4, "Bonita Computadora y muy funcional" );
    
    INSERT INTO calificacion (`id`, `calificacion`) 
    VALUES (1, 5);
    INSERT INTO calificacion (`id`, `calificacion`) 
    VALUES (1, 4.5);
    INSERT INTO calificacion (`id`, `calificacion`) 
    VALUES (2, 3);
    INSERT INTO calificacion (`id`, `calificacion`) 
    VALUES (2, 3.6);
    INSERT INTO calificacion (`id`, `calificacion`) 
    VALUES (3, 1.5);
    INSERT INTO calificacion (`id`, `calificacion`) 
    VALUES (4, 2.7);
    
DELETE calificacion, comentario, imagen, producto
   FROM imagen, calificacion, comentario, producto
   WHERE imagen.id=calificacion.id=comentario.id=producto.id = 5;

  SELECT * FROM producto;
    SELECT * FROM imagen;
    SELECT * FROM comentario;
    SELECT * FROM calificacion;

    SELECT * FROM vendedor WHERE (correo = "micorreito@gmail.com" AND contrasena = "Pepegrillo");