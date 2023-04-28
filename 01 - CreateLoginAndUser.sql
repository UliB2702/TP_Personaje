USE [master]
GO
CREATE LOGIN [Personaje] WITH PASSWORD=N'Personajes', DEFAULT_DATABASE=[PersonajeYPeliculas], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO

USE [PersonajeYPeliculas]
GO
CREATE USER [Personaje] FOR LOGIN [Personaje]
GO
USE [PersonajeYPeliculas]
GO
ALTER ROLE [db_owner] ADD MEMBER [Personaje]
GO
