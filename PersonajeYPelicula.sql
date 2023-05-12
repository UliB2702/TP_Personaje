USE [master]
GO
/****** Object:  Database [PersonajeYPeliculas]    Script Date: 12/5/2023 11:58:33 ******/
CREATE DATABASE [PersonajeYPeliculas]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'PersonajeYPeliculas', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\PersonajeYPeliculas.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'PersonajeYPeliculas_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\PersonajeYPeliculas_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [PersonajeYPeliculas] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [PersonajeYPeliculas].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [PersonajeYPeliculas] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [PersonajeYPeliculas] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [PersonajeYPeliculas] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [PersonajeYPeliculas] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [PersonajeYPeliculas] SET ARITHABORT OFF 
GO
ALTER DATABASE [PersonajeYPeliculas] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [PersonajeYPeliculas] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [PersonajeYPeliculas] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [PersonajeYPeliculas] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [PersonajeYPeliculas] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [PersonajeYPeliculas] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [PersonajeYPeliculas] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [PersonajeYPeliculas] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [PersonajeYPeliculas] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [PersonajeYPeliculas] SET  DISABLE_BROKER 
GO
ALTER DATABASE [PersonajeYPeliculas] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [PersonajeYPeliculas] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [PersonajeYPeliculas] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [PersonajeYPeliculas] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [PersonajeYPeliculas] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [PersonajeYPeliculas] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [PersonajeYPeliculas] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [PersonajeYPeliculas] SET RECOVERY FULL 
GO
ALTER DATABASE [PersonajeYPeliculas] SET  MULTI_USER 
GO
ALTER DATABASE [PersonajeYPeliculas] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [PersonajeYPeliculas] SET DB_CHAINING OFF 
GO
ALTER DATABASE [PersonajeYPeliculas] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [PersonajeYPeliculas] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [PersonajeYPeliculas] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'PersonajeYPeliculas', N'ON'
GO
ALTER DATABASE [PersonajeYPeliculas] SET QUERY_STORE = OFF
GO
USE [PersonajeYPeliculas]
GO
/****** Object:  User [Personaje]    Script Date: 12/5/2023 11:58:33 ******/
CREATE USER [Personaje] FOR LOGIN [Personaje] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [alumno]    Script Date: 12/5/2023 11:58:33 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [Personaje]
GO
/****** Object:  Table [dbo].[PeliculaSerie]    Script Date: 12/5/2023 11:58:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PeliculaSerie](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Imagen] [varchar](max) NOT NULL,
	[Titulo] [varchar](max) NOT NULL,
	[FechaCreacion] [date] NOT NULL,
	[Calificacion] [float] NOT NULL,
 CONSTRAINT [PK_PeliculaSerie] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Personaje]    Script Date: 12/5/2023 11:58:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Personaje](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Imagen] [varchar](max) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Edad] [int] NOT NULL,
	[Peso] [int] NOT NULL,
	[Historia] [varchar](max) NOT NULL,
 CONSTRAINT [PK_Personaje] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PersonajeXPeliculaSerie]    Script Date: 12/5/2023 11:58:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PersonajeXPeliculaSerie](
	[IdPersonaje] [int] NOT NULL,
	[IdPeliculaSerie] [int] NOT NULL
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[PeliculaSerie] ON 

INSERT [dbo].[PeliculaSerie] ([Id], [Imagen], [Titulo], [FechaCreacion], [Calificacion]) VALUES (1, N'https://m.media-amazon.com/images/M/MV5BOWEwODJmZDItYTNmZC00OGM4LThlNDktOTQzZjIzMGQxODA4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg', N'Rush: Pasion y Gloria', CAST(N'2013-09-27' AS Date), 4)
INSERT [dbo].[PeliculaSerie] ([Id], [Imagen], [Titulo], [FechaCreacion], [Calificacion]) VALUES (3, N'https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_SX300.jpg', N'Cars', CAST(N'2006-06-09' AS Date), 3)
SET IDENTITY_INSERT [dbo].[PeliculaSerie] OFF
GO
SET IDENTITY_INSERT [dbo].[Personaje] ON 

INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (2, N'https://upload.wikimedia.org/wikipedia/commons/e/e0/Niki_Lauda%2C_Bestanddeelnr_928-0040.jpg', N'Niki Lauda', 26, 70, N'Campeon Mundial F1')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (3, N'https://i.ytimg.com/vi/2gRcvS2ltjE/maxresdefault.jpg', N'Rayo McQueen', 27, 1472, N'Piloto')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (4, N'https://media.formula1.com/content/dam/fom-website/manual/Hunt4.jpg', N'James Hunt', 28, 75, N'Campeon Mundial F1')
SET IDENTITY_INSERT [dbo].[Personaje] OFF
GO
INSERT [dbo].[PersonajeXPeliculaSerie] ([IdPersonaje], [IdPeliculaSerie]) VALUES (2, 1)
INSERT [dbo].[PersonajeXPeliculaSerie] ([IdPersonaje], [IdPeliculaSerie]) VALUES (3, 3)
INSERT [dbo].[PersonajeXPeliculaSerie] ([IdPersonaje], [IdPeliculaSerie]) VALUES (4, 1)
GO
USE [master]
GO
ALTER DATABASE [PersonajeYPeliculas] SET  READ_WRITE 
GO
