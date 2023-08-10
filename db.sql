CREATE DATABASE BankExchange;
USE `BankExchange` ;

-- -----------------------------------------------------
-- Table `Coins`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Coins` (
  `id` INT NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `Requests`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Requests` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idCoin` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_Requests_Coins1`
    FOREIGN KEY (`idCoin`)
    REFERENCES `Coins` (`id`));


-- -----------------------------------------------------
-- Table `ExchangeRates`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ExchangeRates` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `sellAmount` DOUBLE NOT NULL,
  `buyAmount` DOUBLE NOT NULL,
  `idRequest` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_ExchangeRates_Requests`
    FOREIGN KEY (`idRequest`)
    REFERENCES `Requests` (`id`));

INSERT INTO coins(id, description) VALUES (1, "Quetzales");
INSERT INTO coins(id, description) VALUES (2, "Dólares de EE.UU.");