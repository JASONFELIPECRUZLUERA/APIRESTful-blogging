-- MySQL Script generated by MySQL Workbench
-- Tue Apr 30 09:06:38 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

-- Disable foreign key checks and unique checks temporarily
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;

-- Set SQL mode
SET @OLD_SQL_MODE=@@SQL_MODE;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- Create schema if not exists
CREATE SCHEMA IF NOT EXISTS `blogging` DEFAULT CHARACTER SET utf8;
USE `blogging`;

-- Table `roles`
CREATE TABLE IF NOT EXISTS `roles` (
  `id_roles` INT NOT NULL,
  `rol_nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_roles`)
) ENGINE=InnoDB;

-- Table `usuarios`
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuarios` INT NOT NULL,
  `usuario_nombre` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `id_roles` INT NOT NULL,
  PRIMARY KEY (`id_usuarios`),
  INDEX `idroles_idx` (`id_roles` ASC),
  CONSTRAINT `idroles`
    FOREIGN KEY (`id_roles`)
    REFERENCES `roles` (`id_roles`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB;

-- Table `publicaciones`
CREATE TABLE IF NOT EXISTS `publicaciones` (
  `id_publicaciones` INT NOT NULL,
  `titulo` VARCHAR(45) NOT NULL,
  `contenido` TEXT NOT NULL,
  `id_usuarios` INT NOT NULL,
  `fecha_publicacion` DATE NOT NULL,
  PRIMARY KEY (`id_publicaciones`),
  INDEX `id_usuarios_idx` (`id_usuarios` ASC),
  CONSTRAINT `id_usuarios`
    FOREIGN KEY (`id_usuarios`)
    REFERENCES `usuarios` (`id_usuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB;

-- Table `comentarios`
CREATE TABLE IF NOT EXISTS `comentarios` (
  `id_comentarios` INT NOT NULL,
  `comentario` VARCHAR(45) NOT NULL,
  `id_usuarios` INT NOT NULL,
  `id_publicaciones` INT NOT NULL,
  `fecha_comentario` DATE NOT NULL,
  PRIMARY KEY (`id_comentarios`),
  INDEX `id_usuarios_idx` (`id_usuarios` ASC),
  INDEX `id_publicaciones_idx` (`id_publicaciones` ASC),
  CONSTRAINT `fk_usuarios`
    FOREIGN KEY (`id_usuarios`)
    REFERENCES `usuarios` (`id_usuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_publicaciones`
    FOREIGN KEY (`id_publicaciones`)
    REFERENCES `publicaciones` (`id_publicaciones`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB;

-- Table `categorias`
CREATE TABLE IF NOT EXISTS `categorias` (
  `id_categorias` INT NOT NULL,
  `categoria_nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_categorias`)
) ENGINE=InnoDB;

-- Table `categorias_publicaciones`
CREATE TABLE IF NOT EXISTS `categorias_publicaciones` (
  `id_categorias_publicaciones` INT NOT NULL,
  `id_categorias` INT NOT NULL,
  `id_publicaciones` INT NOT NULL,
  PRIMARY KEY (`id_categorias_publicaciones`),
  INDEX `id_categorias_idx` (`id_categorias` ASC),
  INDEX `id_publicaciones_idx` (`id_publicaciones` ASC),
  CONSTRAINT `fk_categorias`
    FOREIGN KEY (`id_categorias`)
    REFERENCES `categorias` (`id_categorias`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_publicaciones2`
    FOREIGN KEY (`id_publicaciones`)
    REFERENCES `publicaciones` (`id_publicaciones`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB;

-- Restore previous settings
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
