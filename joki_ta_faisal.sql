-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 27, 2025 at 04:28 PM
-- Server version: 8.0.30
-- PHP Version: 8.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `joki_ta_faisal`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expo_push_tokens`
--

CREATE TABLE `expo_push_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `device_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `expo_push_tokens`
--

INSERT INTO `expo_push_tokens` (`id`, `device_id`, `token`, `created_at`, `updated_at`) VALUES
(1, 'RP1A.200720.012.A205FXXSBCWC5-Galaxy A20 milik JAUHAR', 'ExponentPushToken[gF4oDGG18OFOleLlpafQdP]', '2025-06-14 17:10:06', '2025-06-18 06:06:45'),
(2, 'AP3A.240905.015.A2-Redmi 12', 'ExponentPushToken[tEPCHnOi4osEbDU1Od3fvb]', '2025-06-14 17:33:43', '2025-06-14 17:33:43');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `history_pembayarans`
--

CREATE TABLE `history_pembayarans` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `tagihan_id` bigint UNSIGNED NOT NULL,
  `transaksi_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `history_pembayarans`
--

INSERT INTO `history_pembayarans` (`id`, `user_id`, `tagihan_id`, `transaksi_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, '2025-06-14 17:10:44', '2025-06-14 17:10:44'),
(2, 1, 2, 2, '2025-06-14 17:12:13', '2025-06-14 17:12:13'),
(3, 16, 182, 3, '2025-06-14 17:34:26', '2025-06-14 17:34:26'),
(4, 1, 3, 4, '2025-06-15 07:29:49', '2025-06-15 07:29:49'),
(5, 93, 1105, 5, '2025-06-15 11:33:35', '2025-06-15 11:33:35'),
(6, 1, 4, 6, '2025-06-15 11:44:15', '2025-06-15 11:44:15'),
(7, 1, 5, 7, '2025-06-15 12:23:23', '2025-06-15 12:23:23'),
(8, 1, 6, 8, '2025-06-15 12:25:15', '2025-06-15 12:25:15'),
(9, 1, 7, 9, '2025-06-15 12:43:22', '2025-06-15 12:43:22'),
(10, 1, 12, 10, '2025-06-15 13:15:55', '2025-06-15 13:15:55'),
(11, 16, 181, 12, '2025-06-15 17:50:15', '2025-06-15 17:50:15'),
(12, 1, 1213, 13, '2025-06-15 19:41:23', '2025-06-15 19:41:23'),
(13, 1, 1214, 14, '2025-06-15 19:41:23', '2025-06-15 19:41:23'),
(14, 1, 1215, 15, '2025-06-15 22:29:43', '2025-06-15 22:29:43'),
(15, 1, 1216, 16, '2025-06-15 22:29:43', '2025-06-15 22:29:43'),
(16, 1, 1217, 17, '2025-06-16 10:22:48', '2025-06-16 10:22:48'),
(17, 1, 1218, 18, '2025-06-16 10:22:48', '2025-06-16 10:22:48'),
(18, 1, 11, 19, '2025-06-16 12:15:50', '2025-06-16 12:15:50'),
(19, 1, 10, 20, '2025-06-17 10:35:07', '2025-06-17 10:35:07'),
(20, 1, 1227, 21, '2025-06-18 09:15:23', '2025-06-18 09:15:23'),
(21, 1, 1219, 22, '2025-06-18 09:20:55', '2025-06-18 09:20:55'),
(22, 1, 1220, 23, '2025-06-18 09:25:03', '2025-06-18 09:25:03');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `metode_pembayarans`
--

CREATE TABLE `metode_pembayarans` (
  `id` bigint UNSIGNED NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kategori` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gambar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `metode_pembayarans`
--

INSERT INTO `metode_pembayarans` (`id`, `nama`, `kategori`, `gambar`, `created_at`, `updated_at`) VALUES
(1, 'BCA', 'bank_transfer', 'bank/bca.png', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(2, 'BRI', 'bank_transfer', 'bank/bri.png', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(3, 'BNI', 'bank_transfer', 'bank/bni.png', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(4, 'PERMATA', 'bank_transfer', 'bank/permata_bank.png', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(5, 'MANDIRI', 'bank_transfer', 'bank/mandiri.png', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(6, 'DANA', 'e_wallet', 'bank/dana.png', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(7, 'GOPAY', 'e_wallet', 'bank/gopay_white.png', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(8, 'QRIS', 'e_wallet', 'bank/qris.png', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(9, 'SHOPEEPAY', 'e_wallet', 'bank/shopeepay_rectangle_orange.png', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(10, 'ALFAMART', 'cstore', 'bank/alfamart.png', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(11, 'INDOMARET', 'cstore', 'bank/indomaret.png', '2025-06-14 17:04:18', '2025-06-14 17:04:18');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_06_01_010338_create_tagihans_table', 1),
(5, '2025_06_01_010351_create_transaksis_table', 1),
(6, '2025_06_01_011138_create_history_pembayarans_table', 1),
(7, '2025_06_01_011335_create_notifikasis_table', 1),
(8, '2025_06_01_015538_create_permission_tables', 1),
(9, '2025_06_02_043922_create_personal_access_tokens_table', 1),
(10, '2025_06_03_161539_create_expo_push_tokens_table', 1),
(11, '2025_06_12_043948_create_metode_pembayarans_table', 1),
(12, '2025_06_17_231827_utils', 2);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(2, 'App\\Models\\User', 1),
(1, 'App\\Models\\User', 2),
(1, 'App\\Models\\User', 3),
(1, 'App\\Models\\User', 4),
(1, 'App\\Models\\User', 5),
(1, 'App\\Models\\User', 6),
(1, 'App\\Models\\User', 7),
(1, 'App\\Models\\User', 8),
(1, 'App\\Models\\User', 9),
(1, 'App\\Models\\User', 10),
(1, 'App\\Models\\User', 11),
(1, 'App\\Models\\User', 12),
(1, 'App\\Models\\User', 13),
(1, 'App\\Models\\User', 14),
(1, 'App\\Models\\User', 15),
(1, 'App\\Models\\User', 16),
(1, 'App\\Models\\User', 17),
(1, 'App\\Models\\User', 18),
(1, 'App\\Models\\User', 19),
(1, 'App\\Models\\User', 20),
(1, 'App\\Models\\User', 21),
(1, 'App\\Models\\User', 22),
(1, 'App\\Models\\User', 23),
(1, 'App\\Models\\User', 24),
(1, 'App\\Models\\User', 25),
(1, 'App\\Models\\User', 26),
(1, 'App\\Models\\User', 27),
(1, 'App\\Models\\User', 28),
(1, 'App\\Models\\User', 29),
(1, 'App\\Models\\User', 30),
(1, 'App\\Models\\User', 31),
(1, 'App\\Models\\User', 32),
(1, 'App\\Models\\User', 33),
(1, 'App\\Models\\User', 34),
(1, 'App\\Models\\User', 35),
(1, 'App\\Models\\User', 36),
(1, 'App\\Models\\User', 37),
(1, 'App\\Models\\User', 38),
(1, 'App\\Models\\User', 39),
(1, 'App\\Models\\User', 40),
(1, 'App\\Models\\User', 41),
(1, 'App\\Models\\User', 42),
(1, 'App\\Models\\User', 43),
(1, 'App\\Models\\User', 44),
(1, 'App\\Models\\User', 45),
(1, 'App\\Models\\User', 46),
(1, 'App\\Models\\User', 47),
(1, 'App\\Models\\User', 48),
(1, 'App\\Models\\User', 49),
(1, 'App\\Models\\User', 50),
(1, 'App\\Models\\User', 51),
(1, 'App\\Models\\User', 52),
(1, 'App\\Models\\User', 53),
(1, 'App\\Models\\User', 54),
(1, 'App\\Models\\User', 55),
(1, 'App\\Models\\User', 56),
(1, 'App\\Models\\User', 57),
(1, 'App\\Models\\User', 58),
(1, 'App\\Models\\User', 59),
(1, 'App\\Models\\User', 60),
(1, 'App\\Models\\User', 61),
(1, 'App\\Models\\User', 62),
(1, 'App\\Models\\User', 63),
(1, 'App\\Models\\User', 64),
(1, 'App\\Models\\User', 65),
(1, 'App\\Models\\User', 66),
(1, 'App\\Models\\User', 67),
(1, 'App\\Models\\User', 68),
(1, 'App\\Models\\User', 69),
(1, 'App\\Models\\User', 70),
(1, 'App\\Models\\User', 71),
(1, 'App\\Models\\User', 72),
(1, 'App\\Models\\User', 73),
(1, 'App\\Models\\User', 74),
(1, 'App\\Models\\User', 75),
(1, 'App\\Models\\User', 76),
(1, 'App\\Models\\User', 77),
(1, 'App\\Models\\User', 78),
(1, 'App\\Models\\User', 79),
(1, 'App\\Models\\User', 80),
(1, 'App\\Models\\User', 81),
(1, 'App\\Models\\User', 82),
(1, 'App\\Models\\User', 83),
(1, 'App\\Models\\User', 84),
(1, 'App\\Models\\User', 85),
(1, 'App\\Models\\User', 86),
(1, 'App\\Models\\User', 87),
(1, 'App\\Models\\User', 88),
(1, 'App\\Models\\User', 89),
(1, 'App\\Models\\User', 90),
(1, 'App\\Models\\User', 91),
(1, 'App\\Models\\User', 92),
(1, 'App\\Models\\User', 93),
(1, 'App\\Models\\User', 94),
(1, 'App\\Models\\User', 95),
(1, 'App\\Models\\User', 96),
(1, 'App\\Models\\User', 97),
(1, 'App\\Models\\User', 98),
(1, 'App\\Models\\User', 99),
(1, 'App\\Models\\User', 100),
(1, 'App\\Models\\User', 101);

-- --------------------------------------------------------

--
-- Table structure for table `notifikasis`
--

CREATE TABLE `notifikasis` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `tagihan_id` bigint UNSIGNED NOT NULL,
  `transaksi_id` bigint UNSIGNED NOT NULL,
  `status` enum('belum_dibaca','dibaca') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'belum_dibaca',
  `read_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifikasis`
--

INSERT INTO `notifikasis` (`id`, `user_id`, `tagihan_id`, `transaksi_id`, `status`, `read_at`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 'dibaca', NULL, '2025-06-14 17:15:30', '2025-06-17 11:11:56'),
(2, 1, 2, 2, 'dibaca', NULL, '2025-06-15 07:13:19', '2025-06-17 11:11:56'),
(3, 16, 182, 3, 'belum_dibaca', NULL, '2025-06-15 07:15:49', '2025-06-15 07:15:49'),
(4, 1, 4, 6, 'dibaca', NULL, '2025-06-15 11:58:31', '2025-06-17 11:11:56'),
(5, 1, 3, 4, 'dibaca', NULL, '2025-06-15 11:59:49', '2025-06-17 11:11:56'),
(6, 1, 5, 7, 'dibaca', NULL, '2025-06-15 12:24:19', '2025-06-17 11:11:56'),
(7, 1, 6, 8, 'dibaca', NULL, '2025-06-15 12:25:29', '2025-06-17 11:11:56'),
(8, 1, 7, 9, 'dibaca', NULL, '2025-06-15 12:43:38', '2025-06-17 11:11:56'),
(9, 1, 12, 10, 'dibaca', NULL, '2025-06-15 13:16:43', '2025-06-17 11:11:56'),
(10, 16, 181, 12, 'belum_dibaca', NULL, '2025-06-15 17:50:25', '2025-06-15 17:50:25'),
(11, 1, 1213, 13, 'dibaca', NULL, '2025-06-15 22:19:21', '2025-06-17 11:11:56'),
(12, 1, 1215, 15, 'dibaca', NULL, '2025-06-15 22:29:56', '2025-06-17 11:11:56'),
(13, 1, 1217, 17, 'dibaca', NULL, '2025-06-16 10:24:02', '2025-06-17 11:11:56'),
(14, 1, 1218, 18, 'dibaca', NULL, '2025-06-16 10:41:28', '2025-06-17 11:11:56'),
(15, 1, 1216, 16, 'dibaca', NULL, '2025-06-16 16:58:51', '2025-06-17 11:11:56'),
(16, 1, 1214, 14, 'dibaca', NULL, '2025-06-16 17:07:16', '2025-06-17 11:11:56'),
(17, 1, 10, 20, 'dibaca', NULL, '2025-06-17 10:59:30', '2025-06-17 11:11:56'),
(18, 1, 11, 19, 'dibaca', NULL, '2025-06-17 11:32:47', '2025-06-17 11:33:44'),
(19, 1, 1227, 21, 'dibaca', NULL, '2025-06-18 09:15:45', '2025-06-18 09:16:48'),
(20, 1, 1219, 22, 'dibaca', NULL, '2025-06-18 09:21:35', '2025-06-18 09:23:18'),
(21, 1, 1220, 23, 'belum_dibaca', NULL, '2025-06-18 09:25:14', '2025-06-18 09:25:14');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'create tagihan', 'web', '2025-06-14 17:03:21', '2025-06-14 17:03:21'),
(2, 'create transaksi', 'web', '2025-06-14 17:03:21', '2025-06-14 17:03:21'),
(3, 'create history-pembayaran', 'web', '2025-06-14 17:03:21', '2025-06-14 17:03:21'),
(4, 'create notifikasi', 'web', '2025-06-14 17:03:21', '2025-06-14 17:03:21'),
(5, 'read tagihan', 'web', '2025-06-14 17:03:21', '2025-06-14 17:03:21'),
(6, 'read transaksi', 'web', '2025-06-14 17:03:21', '2025-06-14 17:03:21'),
(7, 'read history-pembayaran', 'web', '2025-06-14 17:03:21', '2025-06-14 17:03:21'),
(8, 'read notifikasi', 'web', '2025-06-14 17:03:21', '2025-06-14 17:03:21'),
(9, 'update tagihan', 'web', '2025-06-14 17:03:21', '2025-06-14 17:03:21'),
(10, 'update transaksi', 'web', '2025-06-14 17:03:21', '2025-06-14 17:03:21'),
(11, 'update history-pembayaran', 'web', '2025-06-14 17:03:21', '2025-06-14 17:03:21'),
(12, 'update notifikasi', 'web', '2025-06-14 17:03:21', '2025-06-14 17:03:21'),
(13, 'delete tagihan', 'web', '2025-06-14 17:03:21', '2025-06-14 17:03:21'),
(14, 'delete transaksi', 'web', '2025-06-14 17:03:21', '2025-06-14 17:03:21'),
(15, 'delete history-pembayaran', 'web', '2025-06-14 17:03:21', '2025-06-14 17:03:21'),
(16, 'delete notifikasi', 'web', '2025-06-14 17:03:21', '2025-06-14 17:03:21');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'AuthToken', '3baf2499342e40d615c13a1df117c3d35e33a14cd10caba2cb329647a11252ad', '[\"*\"]', '2025-06-15 18:23:47', NULL, '2025-06-14 17:10:09', '2025-06-15 18:23:47'),
(2, 'App\\Models\\User', 16, 'AuthToken', 'f55906dc2ebd366647bb96230f8fa05b860cfa8ac9e63c28b72713176dde4a09', '[\"*\"]', '2025-06-15 18:26:51', NULL, '2025-06-14 17:33:45', '2025-06-15 18:26:51'),
(3, 'App\\Models\\User', 1, 'AuthToken', 'daa8627bd3fee2ad405e61048d7bbff4228c9c3f9b6c7f21bce3b300efd66982', '[\"*\"]', '2025-06-17 10:16:49', NULL, '2025-06-15 13:20:53', '2025-06-17 10:16:49'),
(4, 'App\\Models\\User', 1, 'AuthToken', '4c84668b506ceffc2f729f5bfcbed77c70885410042b88c34831acbac435930b', '[\"*\"]', '2025-06-15 18:29:15', NULL, '2025-06-15 18:28:35', '2025-06-15 18:29:15'),
(5, 'App\\Models\\User', 16, 'AuthToken', 'db723358277ed6121edb21487cb3a85a6c861899519c936daf74801939479462', '[\"*\"]', '2025-06-15 18:31:15', NULL, '2025-06-15 18:29:54', '2025-06-15 18:31:15'),
(6, 'App\\Models\\User', 1, 'AuthToken', '28e0f95fa164055e0d348152ebb0546194639689afd1d83bfe0ca4521cf0fc7c', '[\"*\"]', '2025-06-15 18:32:22', NULL, '2025-06-15 18:31:46', '2025-06-15 18:32:22'),
(7, 'App\\Models\\User', 16, 'AuthToken', '5e2dedc841db308bb458027a72214a0a6c9a1399a5744878effbaae33d226cba', '[\"*\"]', '2025-06-15 18:32:55', NULL, '2025-06-15 18:32:50', '2025-06-15 18:32:55'),
(8, 'App\\Models\\User', 1, 'AuthToken', 'eaf7ec09ac3293749fb2326fff1e4abc12f2f8a54d0e00920976b81838175536', '[\"*\"]', '2025-06-17 09:42:02', NULL, '2025-06-15 18:33:18', '2025-06-17 09:42:02'),
(9, 'App\\Models\\User', 1, 'AuthToken', '3df9795c1f8252e62bf7a5874d94483d2a95f1a857b26d0a630e6512d6bf96c2', '[\"*\"]', '2025-06-16 11:28:59', NULL, '2025-06-15 22:12:02', '2025-06-16 11:28:59'),
(10, 'App\\Models\\User', 1, 'AuthToken', '914f1bb4f3041a7b74524058e653b4ddf1b0bf726fa1c91ff86cedf8b838949c', '[\"*\"]', '2025-06-17 12:02:57', NULL, '2025-06-16 14:49:49', '2025-06-17 12:02:57'),
(11, 'App\\Models\\User', 1, 'AuthToken', 'ab8135055e7606e8d54b23cee352576d1fb688ee21a33d8626087a932c536fbc', '[\"*\"]', '2025-06-17 09:53:44', NULL, '2025-06-17 09:42:42', '2025-06-17 09:53:44'),
(12, 'App\\Models\\User', 1, 'AuthToken', 'f02ddf29cc9a24a475a91a5b0291bb6a831e7500bb53cba0f996d08ad46fbf15', '[\"*\"]', '2025-06-17 11:33:57', NULL, '2025-06-17 10:04:09', '2025-06-17 11:33:57'),
(13, 'App\\Models\\User', 1, 'AuthToken', '16a72a805c45cb0467e532a2b564c0c92465f5a42aa8228505215f306331843f', '[\"*\"]', '2025-06-17 13:14:52', NULL, '2025-06-17 12:03:14', '2025-06-17 13:14:52'),
(14, 'App\\Models\\User', 1, 'AuthToken', 'd388f0e03eff4c6cf548728f3de3fdfd77488627864a97298e569dcfe052d0e1', '[\"*\"]', '2025-06-18 08:22:31', NULL, '2025-06-18 06:07:02', '2025-06-18 08:22:31'),
(15, 'App\\Models\\User', 1, 'AuthToken', 'fbf1bf6cfecbbe6ea8fb70dc80ae36d2e8db2393a1fdb5e13dffc5e39984f1ec', '[\"*\"]', '2025-06-18 09:28:43', NULL, '2025-06-18 08:22:52', '2025-06-18 09:28:43');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'user', 'web', '2025-06-14 17:03:21', '2025-06-14 17:03:21'),
(2, 'super-admin', 'web', '2025-06-14 17:03:21', '2025-06-14 17:03:21');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(13, 1),
(15, 1),
(16, 1),
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(5, 2),
(6, 2),
(7, 2),
(8, 2),
(9, 2),
(10, 2),
(11, 2),
(12, 2),
(13, 2),
(14, 2),
(15, 2),
(16, 2);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('oQPcKtifpMz42n0TWYBh7gO3hEy2wo6RophhK3aY', NULL, '2001:448a:50e2:782:7aba:877:7a5d:624c', 'WhatsApp/2.2517.4 W', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVVZDdkp3dlgzb0NaSkZBNE1vWjhlaVdmMFU0NjdadVZzc2dMNWhlbSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vbG9jYWwuanRlY2gubXkuaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750239322),
('PHunhotviMBijdEQmTTPIkd1FcaoPGPnmfwZH1GY', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiYmZZUVVSRGIycEFLcTkya2lzTVAwRDNwZ0o3VDh1TVBDR2JuWkxyUCI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czozMToiaHR0cDovL2xvY2FsaG9zdDo4MDAwL3RyYW5zYWtzaSI7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjIxOiJodHRwOi8vbG9jYWxob3N0OjgwMDAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=', 1750237778),
('puoeG7NefxJzI6TjjrYdJLFBto7QFf0rKBm4XJps', NULL, '2001:448a:50e2:782:7aba:877:7a5d:624c', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTkxzRXdTd3FnZEpsMFFpbjFpZTBOVHZ6SExyRkJ1dzdOakVrYVltZSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vbG9jYWwuanRlY2gubXkuaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750239360),
('qIV0jFwV4omOECqE5dLJH5IXPIaQMBO6aHJQx1OK', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiUm9LbTBTTjBHYTN6NHdMeGNsRlZNbGVHZ0drR0d3UkZlZVRFNWNFeiI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czoyNjoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2hvbWUiO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czozMToiaHR0cDovL2xvY2FsaG9zdDo4MDAwL3RyYW5zYWtzaSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1750182123),
('v1lwfZeXomVaRyEESPOXFKXfS4iiODgiWYrnaWYe', 1, '2001:448a:50e2:782:7aba:877:7a5d:624c', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiNnR0c1hJdjF5c0NVV21CQjBObHcycUhWZWlJUkk3NHhldm9yS1lSYyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vbG9jYWwuanRlY2gubXkuaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=', 1750239424);

-- --------------------------------------------------------

--
-- Table structure for table `tagihans`
--

CREATE TABLE `tagihans` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `nama_tagihan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kode_tagihan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nominal` decimal(15,2) NOT NULL,
  `status` enum('pending','authorize','failed','capture','settlement','deny','cancel','refund','partial_refund','partial_chargeback','expire','failure') COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tagihans`
--

INSERT INTO `tagihans` (`id`, `user_id`, `nama_tagihan`, `kode_tagihan`, `nominal`, `status`, `tanggal`, `created_at`, `updated_at`) VALUES
(1, 1, 'labore rerum porro', 'INV-783EY', '100000.00', 'settlement', '2025-03-03 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:15:30'),
(2, 1, 'dolore dolores ducimus', 'INV-098PR', '100000.00', 'expire', '2025-03-16 00:00:00', '2025-06-14 17:04:11', '2025-06-17 11:02:24'),
(3, 1, 'quia qui ipsa', 'INV-689RS', '100000.00', 'settlement', '2025-01-28 00:00:00', '2025-06-14 17:04:11', '2025-06-15 11:59:49'),
(4, 1, 'saepe temporibus sunt', 'INV-830GY', '100000.00', 'settlement', '2025-04-22 00:00:00', '2025-06-14 17:04:11', '2025-06-15 11:58:31'),
(5, 1, 'maxime occaecati aut', 'INV-747AD', '100000.00', 'settlement', '2024-12-26 00:00:00', '2025-06-14 17:04:11', '2025-06-15 12:24:19'),
(6, 1, 'esse laboriosam dolor', 'INV-160DN', '100000.00', 'settlement', '2025-01-24 00:00:00', '2025-06-14 17:04:11', '2025-06-15 12:25:29'),
(7, 1, 'provident incidunt rerum', 'INV-287WD', '100000.00', 'settlement', '2025-05-13 00:00:00', '2025-06-14 17:04:11', '2025-06-15 12:43:38'),
(8, 1, 'nulla vero qui', 'INV-372CF', '100000.00', 'capture', '2025-02-17 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(9, 1, 'excepturi suscipit sed', 'INV-896FC', '100000.00', 'capture', '2025-05-01 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(10, 1, 'tempora reprehenderit architecto', 'INV-223OW', '100000.00', 'settlement', '2025-01-18 00:00:00', '2025-06-14 17:04:11', '2025-06-17 10:59:30'),
(11, 1, 'accusamus eos officiis', 'INV-470KV', '100000.00', 'settlement', '2025-05-06 00:00:00', '2025-06-14 17:04:11', '2025-06-17 11:32:47'),
(12, 1, 'fugit iste quia', 'INV-898CF', '100000.00', 'settlement', '2025-02-21 00:00:00', '2025-06-14 17:04:11', '2025-06-15 13:16:43'),
(13, 2, 'asperiores modi est', 'INV-171IE', '100000.00', 'capture', '2025-05-15 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(14, 2, 'saepe blanditiis quis', 'INV-992GM', '100000.00', 'capture', '2025-03-21 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(15, 2, 'modi aliquam porro', 'INV-066WI', '100000.00', 'capture', '2025-04-27 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(16, 2, 'deleniti non accusantium', 'INV-838GM', '100000.00', 'capture', '2025-01-20 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(17, 2, 'aut labore praesentium', 'INV-800SJ', '100000.00', 'capture', '2025-02-23 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(18, 2, 'qui voluptatem velit', 'INV-610MJ', '100000.00', 'capture', '2025-05-07 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(19, 2, 'quaerat praesentium corrupti', 'INV-389HY', '100000.00', 'capture', '2025-02-20 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(20, 2, 'voluptas consectetur est', 'INV-299IN', '100000.00', 'capture', '2025-02-04 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(21, 2, 'dolorem quis ipsum', 'INV-121YW', '100000.00', 'capture', '2025-03-21 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(22, 2, 'enim similique officia', 'INV-336FZ', '100000.00', 'capture', '2025-05-15 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(23, 2, 'numquam illum officiis', 'INV-271SD', '100000.00', 'capture', '2025-03-12 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(24, 2, 'quisquam qui officia', 'INV-752CC', '100000.00', 'capture', '2025-05-14 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(25, 3, 'laudantium voluptas ducimus', 'INV-018ID', '100000.00', 'capture', '2025-04-09 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(26, 3, 'quas exercitationem odio', 'INV-727SH', '100000.00', 'capture', '2025-04-08 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(27, 3, 'perferendis rerum nostrum', 'INV-429KB', '100000.00', 'capture', '2025-06-02 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(28, 3, 'rerum odio temporibus', 'INV-836NZ', '100000.00', 'capture', '2025-05-01 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(29, 3, 'quas dignissimos dolorum', 'INV-152CC', '100000.00', 'capture', '2025-04-11 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(30, 3, 'ipsum eligendi cupiditate', 'INV-832PT', '100000.00', 'capture', '2025-04-17 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(31, 3, 'reiciendis illum deserunt', 'INV-690OH', '100000.00', 'capture', '2025-03-21 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(32, 3, 'ad voluptatem ab', 'INV-927YV', '100000.00', 'capture', '2025-01-27 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(33, 3, 'minus nobis vel', 'INV-116CH', '100000.00', 'capture', '2025-06-01 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(34, 3, 'vitae omnis tempore', 'INV-485WY', '100000.00', 'capture', '2025-05-18 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(35, 3, 'et deserunt ullam', 'INV-302UV', '100000.00', 'capture', '2025-05-04 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(36, 3, 'atque nihil repellendus', 'INV-616FS', '100000.00', 'capture', '2025-01-11 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(37, 4, 'aut molestias reprehenderit', 'INV-453PB', '100000.00', 'capture', '2024-12-30 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(38, 4, 'dolor sit magnam', 'INV-635MI', '100000.00', 'capture', '2025-06-14 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(39, 4, 'soluta cumque quibusdam', 'INV-320YR', '100000.00', 'capture', '2025-04-15 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(40, 4, 'itaque quisquam cum', 'INV-960ZX', '100000.00', 'capture', '2025-05-04 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(41, 4, 'voluptatem alias magni', 'INV-583WO', '100000.00', 'capture', '2025-03-17 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(42, 4, 'ratione commodi eos', 'INV-986FP', '100000.00', 'capture', '2025-02-16 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(43, 4, 'dolorem hic quo', 'INV-616SY', '100000.00', 'capture', '2024-12-18 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(44, 4, 'asperiores vero eos', 'INV-286BO', '100000.00', 'capture', '2025-05-07 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(45, 4, 'ducimus vero id', 'INV-653LS', '100000.00', 'capture', '2025-05-26 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(46, 4, 'ratione consequatur autem', 'INV-164AE', '100000.00', 'capture', '2025-04-17 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(47, 4, 'ut velit ut', 'INV-479EQ', '100000.00', 'capture', '2025-01-29 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(48, 4, 'autem vitae et', 'INV-074CL', '100000.00', 'capture', '2025-03-06 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(49, 5, 'sit dolorem quia', 'INV-656BZ', '100000.00', 'capture', '2025-06-12 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(50, 5, 'quia nostrum minima', 'INV-468KP', '100000.00', 'capture', '2024-12-16 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(51, 5, 'molestiae officia consectetur', 'INV-812SV', '100000.00', 'capture', '2025-05-01 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(52, 5, 'excepturi debitis tempore', 'INV-435ZF', '100000.00', 'capture', '2025-05-15 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(53, 5, 'pariatur qui fugit', 'INV-073QK', '100000.00', 'capture', '2025-01-10 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(54, 5, 'consequatur temporibus accusantium', 'INV-271KZ', '100000.00', 'capture', '2025-06-08 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(55, 5, 'quibusdam blanditiis voluptas', 'INV-469KK', '100000.00', 'capture', '2025-06-06 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(56, 5, 'blanditiis ut excepturi', 'INV-758PL', '100000.00', 'capture', '2025-04-25 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(57, 5, 'doloribus accusamus et', 'INV-814JA', '100000.00', 'capture', '2025-01-20 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(58, 5, 'quae molestiae nulla', 'INV-654ZH', '100000.00', 'capture', '2025-03-08 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(59, 5, 'dolores cum iure', 'INV-373IL', '100000.00', 'capture', '2025-03-05 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(60, 5, 'debitis omnis aliquid', 'INV-846NP', '100000.00', 'capture', '2025-05-12 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(61, 6, 'maiores inventore nisi', 'INV-664AM', '100000.00', 'capture', '2025-05-26 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(62, 6, 'excepturi pariatur ducimus', 'INV-025HS', '100000.00', 'capture', '2025-02-28 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(63, 6, 'aliquid a delectus', 'INV-494KC', '100000.00', 'capture', '2025-01-25 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(64, 6, 'quis eius sit', 'INV-159TT', '100000.00', 'capture', '2025-01-30 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(65, 6, 'qui neque repudiandae', 'INV-649BM', '100000.00', 'capture', '2025-04-04 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(66, 6, 'labore dolor voluptatibus', 'INV-434CE', '100000.00', 'capture', '2025-04-08 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(67, 6, 'quisquam qui eaque', 'INV-142WT', '100000.00', 'capture', '2025-04-18 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(68, 6, 'nam voluptatibus commodi', 'INV-712GL', '100000.00', 'capture', '2025-03-31 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(69, 6, 'harum quam possimus', 'INV-243AJ', '100000.00', 'capture', '2025-06-10 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(70, 6, 'ad maiores rerum', 'INV-165TO', '100000.00', 'capture', '2025-02-03 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(71, 6, 'quis ab nihil', 'INV-630PP', '100000.00', 'capture', '2025-04-05 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(72, 6, 'minima commodi aut', 'INV-020TV', '100000.00', 'capture', '2025-05-19 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(73, 7, 'expedita recusandae expedita', 'INV-180NY', '100000.00', 'capture', '2025-01-06 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(74, 7, 'voluptatem asperiores ipsa', 'INV-001RY', '100000.00', 'capture', '2025-01-02 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(75, 7, 'praesentium illum quam', 'INV-013LJ', '100000.00', 'capture', '2025-05-04 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(76, 7, 'tenetur dolorem sit', 'INV-745SD', '100000.00', 'capture', '2025-05-10 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(77, 7, 'veniam labore sapiente', 'INV-780FY', '100000.00', 'capture', '2025-04-03 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(78, 7, 'totam facere dolor', 'INV-092MB', '100000.00', 'capture', '2024-12-30 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(79, 7, 'mollitia aut illo', 'INV-156PR', '100000.00', 'capture', '2025-04-12 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(80, 7, 'in dolore voluptas', 'INV-125DL', '100000.00', 'capture', '2025-03-28 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(81, 7, 'nesciunt ducimus nesciunt', 'INV-003IP', '100000.00', 'capture', '2025-02-27 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(82, 7, 'sit repudiandae repellat', 'INV-035RK', '100000.00', 'capture', '2024-12-30 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(83, 7, 'deleniti ipsam omnis', 'INV-300IK', '100000.00', 'capture', '2025-05-09 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(84, 7, 'eum rerum id', 'INV-331IH', '100000.00', 'capture', '2025-02-12 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(85, 8, 'voluptatum suscipit non', 'INV-710RS', '100000.00', 'capture', '2025-01-25 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(86, 8, 'dolores molestias ut', 'INV-233EP', '100000.00', 'capture', '2025-03-11 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(87, 8, 'quidem nam placeat', 'INV-199TM', '100000.00', 'capture', '2025-04-12 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(88, 8, 'ea excepturi molestiae', 'INV-616VA', '100000.00', 'capture', '2024-12-21 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(89, 8, 'aut aut est', 'INV-651WU', '100000.00', 'capture', '2025-04-19 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(90, 8, 'reiciendis dignissimos deleniti', 'INV-459IY', '100000.00', 'capture', '2025-02-23 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(91, 8, 'dolorem necessitatibus asperiores', 'INV-818XS', '100000.00', 'capture', '2025-01-01 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(92, 8, 'ut ut dignissimos', 'INV-396MU', '100000.00', 'capture', '2025-05-20 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(93, 8, 'quas aspernatur neque', 'INV-236UV', '100000.00', 'capture', '2025-01-23 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(94, 8, 'magni aperiam expedita', 'INV-683WM', '100000.00', 'capture', '2025-01-26 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(95, 8, 'laboriosam excepturi perferendis', 'INV-119OS', '100000.00', 'capture', '2025-03-30 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(96, 8, 'est aspernatur dolor', 'INV-797JB', '100000.00', 'capture', '2025-05-03 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(97, 9, 'rerum ad soluta', 'INV-546XZ', '100000.00', 'capture', '2025-04-23 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(98, 9, 'occaecati similique incidunt', 'INV-849MP', '100000.00', 'capture', '2025-05-29 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(99, 9, 'totam et cum', 'INV-695WF', '100000.00', 'capture', '2025-06-04 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(100, 9, 'rerum omnis est', 'INV-641RD', '100000.00', 'capture', '2025-04-22 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(101, 9, 'sit nisi adipisci', 'INV-285JQ', '100000.00', 'capture', '2025-05-22 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(102, 9, 'est excepturi ullam', 'INV-523WJ', '100000.00', 'capture', '2025-01-23 00:00:00', '2025-06-14 17:04:11', '2025-06-14 17:04:11'),
(103, 9, 'et fuga sapiente', 'INV-589WC', '100000.00', 'capture', '2025-03-13 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(104, 9, 'velit nulla atque', 'INV-730CL', '100000.00', 'capture', '2025-02-25 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(105, 9, 'voluptatem saepe autem', 'INV-600WH', '100000.00', 'capture', '2025-05-28 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(106, 9, 'iste velit et', 'INV-950FQ', '100000.00', 'capture', '2025-03-14 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(107, 9, 'ut soluta autem', 'INV-476TG', '100000.00', 'capture', '2025-02-12 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(108, 9, 'eos iste consequatur', 'INV-536ZK', '100000.00', 'capture', '2025-03-05 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(109, 10, 'libero blanditiis id', 'INV-343ND', '100000.00', 'capture', '2025-05-30 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(110, 10, 'dolorum magni qui', 'INV-722NI', '100000.00', 'capture', '2025-02-25 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(111, 10, 'perspiciatis et aut', 'INV-471DL', '100000.00', 'capture', '2025-06-06 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(112, 10, 'animi neque ut', 'INV-565RA', '100000.00', 'capture', '2025-01-24 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(113, 10, 'nesciunt veniam rerum', 'INV-228QL', '100000.00', 'capture', '2024-12-27 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(114, 10, 'aut veniam itaque', 'INV-624ZV', '100000.00', 'capture', '2024-12-27 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(115, 10, 'deserunt fugiat officiis', 'INV-931MD', '100000.00', 'capture', '2025-03-31 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(116, 10, 'voluptatem repellendus repellendus', 'INV-391EX', '100000.00', 'capture', '2025-01-26 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(117, 10, 'est ipsa culpa', 'INV-091ZN', '100000.00', 'capture', '2025-05-15 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(118, 10, 'earum voluptatem laboriosam', 'INV-469OO', '100000.00', 'capture', '2025-01-20 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(119, 10, 'possimus consequatur laudantium', 'INV-316EB', '100000.00', 'capture', '2025-04-13 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(120, 10, 'et et rerum', 'INV-168TO', '100000.00', 'capture', '2025-01-12 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(121, 11, 'optio iure sapiente', 'INV-964FO', '100000.00', 'capture', '2025-04-24 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(122, 11, 'deserunt voluptatem quas', 'INV-790SV', '100000.00', 'capture', '2025-03-25 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(123, 11, 'nulla illo vero', 'INV-376OD', '100000.00', 'capture', '2025-04-22 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(124, 11, 'delectus cupiditate unde', 'INV-507HR', '100000.00', 'capture', '2025-05-26 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(125, 11, 'magnam quia quas', 'INV-871AN', '100000.00', 'capture', '2025-06-09 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(126, 11, 'voluptatem exercitationem vitae', 'INV-073SC', '100000.00', 'capture', '2025-01-02 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(127, 11, 'hic repudiandae velit', 'INV-068GG', '100000.00', 'capture', '2025-05-25 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(128, 11, 'mollitia quo est', 'INV-514VG', '100000.00', 'capture', '2025-05-27 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(129, 11, 'rerum provident non', 'INV-652WP', '100000.00', 'capture', '2025-03-28 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(130, 11, 'qui in excepturi', 'INV-576WF', '100000.00', 'capture', '2025-05-28 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(131, 11, 'placeat in perferendis', 'INV-881QE', '100000.00', 'capture', '2025-01-25 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(132, 11, 'beatae et natus', 'INV-450YD', '100000.00', 'capture', '2024-12-21 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(133, 12, 'saepe dignissimos omnis', 'INV-057PJ', '100000.00', 'capture', '2025-01-12 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(134, 12, 'vitae sed suscipit', 'INV-713TC', '100000.00', 'capture', '2025-06-03 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(135, 12, 'corporis voluptas quos', 'INV-240PY', '100000.00', 'capture', '2024-12-29 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(136, 12, 'fugit vel vero', 'INV-441KP', '100000.00', 'capture', '2025-06-01 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(137, 12, 'dicta nesciunt repellendus', 'INV-667JK', '100000.00', 'capture', '2025-03-04 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(138, 12, 'dignissimos sit cumque', 'INV-619KH', '100000.00', 'capture', '2025-01-27 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(139, 12, 'necessitatibus ea labore', 'INV-952GB', '100000.00', 'capture', '2024-12-30 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(140, 12, 'molestiae voluptatem nemo', 'INV-406PT', '100000.00', 'capture', '2025-03-22 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(141, 12, 'qui vel dignissimos', 'INV-126LG', '100000.00', 'capture', '2025-02-14 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(142, 12, 'sit nostrum qui', 'INV-193HP', '100000.00', 'capture', '2025-02-11 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(143, 12, 'debitis qui non', 'INV-390CY', '100000.00', 'capture', '2025-02-19 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(144, 12, 'modi unde voluptas', 'INV-837AI', '100000.00', 'capture', '2025-05-12 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(145, 13, 'omnis praesentium et', 'INV-601GH', '100000.00', 'capture', '2025-02-19 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(146, 13, 'eligendi adipisci soluta', 'INV-943HO', '100000.00', 'capture', '2025-01-14 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(147, 13, 'sit voluptatem harum', 'INV-841JJ', '100000.00', 'capture', '2025-06-07 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(148, 13, 'sit autem quia', 'INV-448DI', '100000.00', 'capture', '2025-02-01 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(149, 13, 'nulla et ex', 'INV-142KK', '100000.00', 'capture', '2025-06-03 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(150, 13, 'deserunt dicta qui', 'INV-055QB', '100000.00', 'capture', '2025-01-24 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(151, 13, 'rem consequatur debitis', 'INV-805EZ', '100000.00', 'capture', '2025-01-20 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(152, 13, 'voluptas soluta quaerat', 'INV-202ML', '100000.00', 'capture', '2025-02-26 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(153, 13, 'et iure repellendus', 'INV-247QD', '100000.00', 'capture', '2025-06-11 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(154, 13, 'ut at est', 'INV-941FV', '100000.00', 'capture', '2025-04-13 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(155, 13, 'qui nihil id', 'INV-246MF', '100000.00', 'capture', '2025-05-02 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(156, 13, 'ab placeat sit', 'INV-536GR', '100000.00', 'capture', '2025-03-27 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(157, 14, 'blanditiis eos voluptatibus', 'INV-523QW', '100000.00', 'capture', '2025-03-12 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(158, 14, 'placeat velit est', 'INV-445GC', '100000.00', 'capture', '2025-04-19 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(159, 14, 'ad sequi sunt', 'INV-617SW', '100000.00', 'capture', '2025-03-08 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(160, 14, 'mollitia quia beatae', 'INV-222NO', '100000.00', 'capture', '2025-01-06 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(161, 14, 'aut delectus laborum', 'INV-288ES', '100000.00', 'capture', '2025-02-13 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(162, 14, 'in excepturi velit', 'INV-306FA', '100000.00', 'capture', '2025-01-13 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(163, 14, 'veniam quaerat nihil', 'INV-362QD', '100000.00', 'capture', '2025-01-22 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(164, 14, 'error est cum', 'INV-099HM', '100000.00', 'capture', '2025-04-11 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(165, 14, 'eius itaque quos', 'INV-127IA', '100000.00', 'capture', '2025-02-08 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(166, 14, 'eaque ullam quam', 'INV-786GF', '100000.00', 'capture', '2025-06-08 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(167, 14, 'saepe perferendis quis', 'INV-367LF', '100000.00', 'capture', '2025-03-27 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(168, 14, 'dolores eum earum', 'INV-094EW', '100000.00', 'capture', '2024-12-21 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(169, 15, 'vero eligendi possimus', 'INV-401LA', '100000.00', 'capture', '2025-05-26 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(170, 15, 'vero earum numquam', 'INV-098LX', '100000.00', 'capture', '2025-01-10 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(171, 15, 'pariatur consequatur ex', 'INV-989LN', '100000.00', 'capture', '2025-03-26 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(172, 15, 'minima accusantium ut', 'INV-623BK', '100000.00', 'capture', '2025-03-18 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(173, 15, 'qui vel illum', 'INV-243CO', '100000.00', 'capture', '2025-05-20 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(174, 15, 'nesciunt minima vero', 'INV-071YL', '100000.00', 'capture', '2025-03-30 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(175, 15, 'est quia quasi', 'INV-178GD', '100000.00', 'capture', '2025-01-23 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(176, 15, 'sit natus sed', 'INV-425NP', '100000.00', 'capture', '2025-05-16 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(177, 15, 'quis doloribus corporis', 'INV-791UJ', '100000.00', 'capture', '2025-05-03 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(178, 15, 'dolorem voluptas quam', 'INV-141OK', '100000.00', 'capture', '2025-03-24 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(179, 15, 'qui sapiente porro', 'INV-588BX', '100000.00', 'capture', '2025-01-09 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(180, 15, 'ut numquam ducimus', 'INV-057YA', '100000.00', 'capture', '2025-03-14 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(181, 16, 'eum aliquam modi', 'INV-146VR', '100000.00', 'settlement', '2025-03-10 00:00:00', '2025-06-14 17:04:12', '2025-06-15 17:50:25'),
(182, 16, 'sed rem molestias', 'INV-133UF', '100000.00', 'settlement', '2025-06-14 00:00:00', '2025-06-14 17:04:12', '2025-06-15 07:15:49'),
(183, 16, 'placeat deserunt soluta', 'INV-274SJ', '100000.00', 'capture', '2025-04-17 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(184, 16, 'fugiat dolor iste', 'INV-936BG', '100000.00', 'capture', '2025-05-09 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(185, 16, 'enim nulla eligendi', 'INV-773GD', '100000.00', 'capture', '2025-02-12 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(186, 16, 'vel soluta voluptatem', 'INV-820MR', '100000.00', 'capture', '2025-03-29 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(187, 16, 'quaerat error et', 'INV-438SP', '100000.00', 'capture', '2025-06-10 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(188, 16, 'quia velit laboriosam', 'INV-641UM', '100000.00', 'capture', '2025-04-13 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(189, 16, 'facere nisi aut', 'INV-190JH', '100000.00', 'capture', '2025-05-10 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(190, 16, 'suscipit omnis corrupti', 'INV-627MD', '100000.00', 'capture', '2025-01-05 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(191, 16, 'error est ea', 'INV-000JQ', '100000.00', 'capture', '2024-12-29 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(192, 16, 'repellendus sunt sapiente', 'INV-919XS', '100000.00', 'capture', '2025-05-13 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(193, 17, 'inventore debitis minus', 'INV-538TQ', '100000.00', 'capture', '2025-04-09 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(194, 17, 'et id autem', 'INV-930NZ', '100000.00', 'capture', '2025-04-18 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(195, 17, 'consequuntur aut aspernatur', 'INV-060LV', '100000.00', 'capture', '2025-01-18 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(196, 17, 'dolores qui illo', 'INV-390CB', '100000.00', 'capture', '2025-04-02 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(197, 17, 'ullam rerum error', 'INV-019UB', '100000.00', 'capture', '2025-04-11 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(198, 17, 'nihil fugiat veniam', 'INV-790AV', '100000.00', 'capture', '2025-02-13 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(199, 17, 'ut veritatis aut', 'INV-647OW', '100000.00', 'capture', '2025-03-12 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(200, 17, 'nam est enim', 'INV-793IG', '100000.00', 'capture', '2025-03-09 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(201, 17, 'qui ducimus iusto', 'INV-223FP', '100000.00', 'capture', '2025-03-15 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(202, 17, 'ut ullam necessitatibus', 'INV-998XZ', '100000.00', 'capture', '2024-12-31 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(203, 17, 'rerum magnam harum', 'INV-988QC', '100000.00', 'capture', '2025-04-26 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(204, 17, 'atque explicabo earum', 'INV-459DZ', '100000.00', 'capture', '2025-03-17 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(205, 18, 'dolores rerum deserunt', 'INV-587GS', '100000.00', 'capture', '2024-12-22 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(206, 18, 'est consectetur illum', 'INV-420GK', '100000.00', 'capture', '2025-01-05 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(207, 18, 'quia nemo eos', 'INV-759BX', '100000.00', 'capture', '2025-04-01 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(208, 18, 'sed sit dolorum', 'INV-668MV', '100000.00', 'capture', '2025-01-14 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(209, 18, 'est et reprehenderit', 'INV-933IE', '100000.00', 'capture', '2025-01-28 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(210, 18, 'voluptas voluptas deserunt', 'INV-423TK', '100000.00', 'capture', '2025-05-15 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(211, 18, 'debitis fugiat sequi', 'INV-574JQ', '100000.00', 'capture', '2025-04-16 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(212, 18, 'sunt aut commodi', 'INV-675WQ', '100000.00', 'capture', '2025-01-23 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(213, 18, 'sapiente unde ipsam', 'INV-185OY', '100000.00', 'capture', '2025-02-07 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(214, 18, 'voluptas facere natus', 'INV-853QS', '100000.00', 'capture', '2025-04-23 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(215, 18, 'aspernatur aut quisquam', 'INV-614BB', '100000.00', 'capture', '2025-05-09 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(216, 18, 'rerum beatae dolorum', 'INV-943AO', '100000.00', 'capture', '2025-04-23 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(217, 19, 'et accusamus harum', 'INV-955SN', '100000.00', 'capture', '2025-02-09 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(218, 19, 'at odio animi', 'INV-594YQ', '100000.00', 'capture', '2025-04-02 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(219, 19, 'eum ullam quae', 'INV-918WI', '100000.00', 'capture', '2025-02-11 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(220, 19, 'ut autem dolorem', 'INV-735IB', '100000.00', 'capture', '2024-12-30 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(221, 19, 'unde deleniti tempore', 'INV-056OU', '100000.00', 'capture', '2025-01-13 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(222, 19, 'quo amet id', 'INV-689LD', '100000.00', 'capture', '2025-05-20 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(223, 19, 'iusto possimus et', 'INV-232WE', '100000.00', 'capture', '2025-06-03 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(224, 19, 'ipsum eos ullam', 'INV-378MZ', '100000.00', 'capture', '2025-02-01 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(225, 19, 'porro quae veritatis', 'INV-013GP', '100000.00', 'capture', '2025-05-31 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(226, 19, 'enim non maiores', 'INV-681BZ', '100000.00', 'capture', '2025-04-08 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(227, 19, 'reprehenderit quisquam necessitatibus', 'INV-513TN', '100000.00', 'capture', '2024-12-22 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(228, 19, 'eaque est unde', 'INV-665ZK', '100000.00', 'capture', '2024-12-25 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(229, 20, 'neque aut ut', 'INV-908EU', '100000.00', 'capture', '2025-02-23 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(230, 20, 'omnis sint maiores', 'INV-518BB', '100000.00', 'capture', '2025-03-24 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(231, 20, 'qui dolore dolorem', 'INV-894BQ', '100000.00', 'capture', '2025-02-03 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(232, 20, 'nemo officia sit', 'INV-617AL', '100000.00', 'capture', '2025-05-26 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(233, 20, 'iusto facere aut', 'INV-601KN', '100000.00', 'capture', '2025-05-05 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(234, 20, 'ut sed unde', 'INV-349VU', '100000.00', 'capture', '2025-05-16 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(235, 20, 'illum laboriosam quasi', 'INV-899OX', '100000.00', 'capture', '2025-05-04 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(236, 20, 'exercitationem fuga rerum', 'INV-425LC', '100000.00', 'capture', '2025-06-07 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(237, 20, 'sit rerum qui', 'INV-450HN', '100000.00', 'capture', '2025-03-05 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(238, 20, 'voluptatem magni et', 'INV-696QA', '100000.00', 'capture', '2025-02-14 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(239, 20, 'rem aut alias', 'INV-103WE', '100000.00', 'capture', '2025-02-01 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(240, 20, 'totam ut molestiae', 'INV-866OH', '100000.00', 'capture', '2025-04-04 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(241, 21, 'dolorem fuga alias', 'INV-011UA', '100000.00', 'capture', '2025-03-09 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(242, 21, 'quod accusamus et', 'INV-902RY', '100000.00', 'capture', '2025-05-23 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(243, 21, 'alias consectetur a', 'INV-338VS', '100000.00', 'capture', '2025-05-03 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(244, 21, 'ut non eum', 'INV-013FX', '100000.00', 'capture', '2025-03-26 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(245, 21, 'voluptates tempore quam', 'INV-672TR', '100000.00', 'capture', '2025-03-05 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(246, 21, 'ipsa quaerat aliquam', 'INV-056WQ', '100000.00', 'capture', '2025-02-21 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(247, 21, 'qui laborum laboriosam', 'INV-983YI', '100000.00', 'capture', '2025-02-20 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(248, 21, 'et necessitatibus laudantium', 'INV-027UI', '100000.00', 'capture', '2025-03-02 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(249, 21, 'dignissimos hic autem', 'INV-226JV', '100000.00', 'capture', '2024-12-21 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(250, 21, 'ab non ex', 'INV-648OB', '100000.00', 'capture', '2025-06-05 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(251, 21, 'qui voluptatem aut', 'INV-082TX', '100000.00', 'capture', '2025-02-12 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(252, 21, 'vitae ut laboriosam', 'INV-707FF', '100000.00', 'capture', '2025-01-05 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(253, 22, 'quae at assumenda', 'INV-210ZL', '100000.00', 'capture', '2025-06-06 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(254, 22, 'labore et non', 'INV-733FM', '100000.00', 'capture', '2025-03-01 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(255, 22, 'impedit pariatur provident', 'INV-841GI', '100000.00', 'capture', '2025-03-25 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(256, 22, 'consequuntur aut sint', 'INV-772JI', '100000.00', 'capture', '2025-02-12 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(257, 22, 'dolore incidunt eligendi', 'INV-356DL', '100000.00', 'capture', '2025-03-18 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(258, 22, 'dolor qui a', 'INV-189QM', '100000.00', 'capture', '2025-05-26 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(259, 22, 'est est qui', 'INV-881EZ', '100000.00', 'capture', '2025-06-11 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(260, 22, 'et quia neque', 'INV-271WT', '100000.00', 'capture', '2025-01-12 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(261, 22, 'similique et tempora', 'INV-962HZ', '100000.00', 'capture', '2025-01-30 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(262, 22, 'natus ut saepe', 'INV-698CC', '100000.00', 'capture', '2025-03-22 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(263, 22, 'sapiente et repudiandae', 'INV-702LG', '100000.00', 'capture', '2025-03-18 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(264, 22, 'sint saepe voluptatem', 'INV-835XN', '100000.00', 'capture', '2025-01-16 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(265, 23, 'sed quas ex', 'INV-113GC', '100000.00', 'capture', '2025-02-28 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(266, 23, 'dolor voluptate alias', 'INV-721OZ', '100000.00', 'capture', '2025-03-31 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(267, 23, 'nemo quas earum', 'INV-792CC', '100000.00', 'capture', '2025-05-09 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(268, 23, 'suscipit assumenda temporibus', 'INV-180XJ', '100000.00', 'capture', '2024-12-16 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(269, 23, 'quis tenetur iusto', 'INV-374XS', '100000.00', 'capture', '2025-04-19 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(270, 23, 'sint quia quod', 'INV-161YP', '100000.00', 'capture', '2024-12-31 00:00:00', '2025-06-14 17:04:12', '2025-06-14 17:04:12'),
(271, 23, 'nobis ut dolores', 'INV-553JU', '100000.00', 'capture', '2025-01-22 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(272, 23, 'optio voluptas nam', 'INV-934GX', '100000.00', 'capture', '2025-04-12 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(273, 23, 'ut dicta ea', 'INV-021LI', '100000.00', 'capture', '2025-05-31 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(274, 23, 'ipsum nostrum qui', 'INV-486KF', '100000.00', 'capture', '2025-03-08 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(275, 23, 'omnis eos id', 'INV-249XK', '100000.00', 'capture', '2025-01-07 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(276, 23, 'quod eum laborum', 'INV-829KW', '100000.00', 'capture', '2025-01-22 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(277, 24, 'adipisci voluptas et', 'INV-691TU', '100000.00', 'capture', '2025-01-07 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(278, 24, 'placeat et rerum', 'INV-264DN', '100000.00', 'capture', '2025-06-11 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(279, 24, 'eaque corrupti tenetur', 'INV-582XR', '100000.00', 'capture', '2025-01-21 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(280, 24, 'quos corporis in', 'INV-991RC', '100000.00', 'capture', '2025-02-21 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(281, 24, 'incidunt impedit amet', 'INV-994BB', '100000.00', 'capture', '2025-03-15 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(282, 24, 'placeat odit nam', 'INV-992FW', '100000.00', 'capture', '2025-01-05 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(283, 24, 'omnis voluptatibus aut', 'INV-127AC', '100000.00', 'capture', '2025-05-04 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(284, 24, 'fugiat recusandae sint', 'INV-368EN', '100000.00', 'capture', '2024-12-29 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(285, 24, 'ullam qui nihil', 'INV-294NS', '100000.00', 'capture', '2025-02-25 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(286, 24, 'et natus sunt', 'INV-927HY', '100000.00', 'capture', '2025-03-06 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(287, 24, 'odio quis aut', 'INV-078UV', '100000.00', 'capture', '2025-05-01 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(288, 24, 'aperiam at maxime', 'INV-488ZD', '100000.00', 'capture', '2024-12-15 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(289, 25, 'sed in consequatur', 'INV-045AR', '100000.00', 'capture', '2025-02-25 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(290, 25, 'velit et inventore', 'INV-264GG', '100000.00', 'capture', '2025-06-02 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(291, 25, 'nam similique quis', 'INV-125DT', '100000.00', 'capture', '2025-05-10 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(292, 25, 'sunt aut pariatur', 'INV-653ID', '100000.00', 'capture', '2025-02-03 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(293, 25, 'saepe eius non', 'INV-327LY', '100000.00', 'capture', '2025-03-21 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(294, 25, 'dolor impedit ut', 'INV-431NB', '100000.00', 'capture', '2025-02-03 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(295, 25, 'iste explicabo et', 'INV-235CR', '100000.00', 'capture', '2025-01-06 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(296, 25, 'incidunt consequatur impedit', 'INV-619AY', '100000.00', 'capture', '2025-04-10 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(297, 25, 'ullam ullam ut', 'INV-485AY', '100000.00', 'capture', '2025-01-26 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(298, 25, 'dicta eos quibusdam', 'INV-644NG', '100000.00', 'capture', '2024-12-16 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(299, 25, 'voluptatem dolores alias', 'INV-440GF', '100000.00', 'capture', '2025-02-25 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(300, 25, 'eligendi excepturi dolores', 'INV-836WY', '100000.00', 'capture', '2025-01-11 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(301, 26, 'saepe tempora perspiciatis', 'INV-258PQ', '100000.00', 'capture', '2025-05-13 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(302, 26, 'tempora ullam aut', 'INV-117DF', '100000.00', 'capture', '2025-01-08 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(303, 26, 'voluptas blanditiis sint', 'INV-215NQ', '100000.00', 'capture', '2025-02-27 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(304, 26, 'veniam qui in', 'INV-530QC', '100000.00', 'capture', '2025-01-20 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(305, 26, 'aut enim dignissimos', 'INV-150QZ', '100000.00', 'capture', '2024-12-23 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(306, 26, 'reiciendis error eum', 'INV-078AJ', '100000.00', 'capture', '2025-04-30 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(307, 26, 'eveniet nulla consequatur', 'INV-237HM', '100000.00', 'capture', '2025-04-17 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(308, 26, 'a temporibus ut', 'INV-577XP', '100000.00', 'capture', '2025-04-24 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(309, 26, 'alias necessitatibus enim', 'INV-162VT', '100000.00', 'capture', '2025-03-09 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(310, 26, 'ipsa sit cum', 'INV-949ZG', '100000.00', 'capture', '2024-12-31 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(311, 26, 'sint vitae totam', 'INV-479MZ', '100000.00', 'capture', '2025-06-06 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(312, 26, 'aspernatur quo culpa', 'INV-274XZ', '100000.00', 'capture', '2025-04-09 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(313, 27, 'sunt non temporibus', 'INV-549HS', '100000.00', 'capture', '2025-04-25 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(314, 27, 'exercitationem porro explicabo', 'INV-551SO', '100000.00', 'capture', '2025-03-20 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(315, 27, 'voluptatem earum doloremque', 'INV-316QJ', '100000.00', 'capture', '2025-05-09 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(316, 27, 'laudantium aperiam et', 'INV-400BJ', '100000.00', 'capture', '2025-04-15 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(317, 27, 'nesciunt omnis minima', 'INV-273PM', '100000.00', 'capture', '2025-05-18 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(318, 27, 'et quis neque', 'INV-781OO', '100000.00', 'capture', '2025-05-11 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(319, 27, 'quaerat aperiam soluta', 'INV-518AL', '100000.00', 'capture', '2025-02-10 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(320, 27, 'exercitationem est voluptates', 'INV-150CZ', '100000.00', 'capture', '2025-02-18 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(321, 27, 'est quia deserunt', 'INV-535MP', '100000.00', 'capture', '2025-02-10 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(322, 27, 'suscipit nemo laborum', 'INV-847PL', '100000.00', 'capture', '2025-03-21 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(323, 27, 'hic consequuntur tenetur', 'INV-572XG', '100000.00', 'capture', '2025-05-13 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(324, 27, 'et voluptates qui', 'INV-807UN', '100000.00', 'capture', '2025-03-04 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(325, 28, 'quam rerum vel', 'INV-242HZ', '100000.00', 'capture', '2025-03-31 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(326, 28, 'dignissimos sint nihil', 'INV-892SU', '100000.00', 'capture', '2025-05-26 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(327, 28, 'possimus doloribus qui', 'INV-439UT', '100000.00', 'capture', '2024-12-23 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(328, 28, 'ullam itaque atque', 'INV-665JG', '100000.00', 'capture', '2025-02-08 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(329, 28, 'doloribus velit sunt', 'INV-130VS', '100000.00', 'capture', '2025-05-07 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(330, 28, 'laudantium omnis vero', 'INV-783JV', '100000.00', 'capture', '2025-02-25 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(331, 28, 'et voluptas non', 'INV-934QF', '100000.00', 'capture', '2025-01-26 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(332, 28, 'voluptatibus animi quaerat', 'INV-176QY', '100000.00', 'capture', '2025-05-26 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(333, 28, 'sunt fugiat non', 'INV-183WS', '100000.00', 'capture', '2025-06-12 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(334, 28, 'nisi ipsa quia', 'INV-356OT', '100000.00', 'capture', '2025-02-02 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(335, 28, 'assumenda laborum odit', 'INV-601ZA', '100000.00', 'capture', '2025-04-23 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(336, 28, 'nam rerum et', 'INV-743IC', '100000.00', 'capture', '2025-04-15 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(337, 29, 'possimus ducimus cum', 'INV-760SZ', '100000.00', 'capture', '2025-03-21 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(338, 29, 'vero veniam aperiam', 'INV-241XR', '100000.00', 'capture', '2024-12-21 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(339, 29, 'ut consequatur cumque', 'INV-130DS', '100000.00', 'capture', '2025-05-28 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(340, 29, 'atque officia odio', 'INV-365WG', '100000.00', 'capture', '2025-05-30 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(341, 29, 'cumque molestiae qui', 'INV-765PU', '100000.00', 'capture', '2025-03-18 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(342, 29, 'hic ipsum libero', 'INV-819PZ', '100000.00', 'capture', '2025-06-06 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(343, 29, 'atque sit suscipit', 'INV-369KW', '100000.00', 'capture', '2025-05-21 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(344, 29, 'aut et ipsam', 'INV-787GD', '100000.00', 'capture', '2024-12-21 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(345, 29, 'sit eos sunt', 'INV-236HB', '100000.00', 'capture', '2025-02-17 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(346, 29, 'magnam totam in', 'INV-021XG', '100000.00', 'capture', '2025-03-28 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(347, 29, 'soluta eaque est', 'INV-851CT', '100000.00', 'capture', '2025-05-15 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(348, 29, 'et sequi sed', 'INV-804VC', '100000.00', 'capture', '2025-03-05 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(349, 30, 'sint aut nihil', 'INV-543DI', '100000.00', 'capture', '2025-03-30 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(350, 30, 'non mollitia aut', 'INV-443YN', '100000.00', 'capture', '2024-12-24 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(351, 30, 'et qui officia', 'INV-612LV', '100000.00', 'capture', '2025-02-12 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(352, 30, 'porro velit itaque', 'INV-681LG', '100000.00', 'capture', '2025-01-26 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(353, 30, 'iusto facere est', 'INV-319ES', '100000.00', 'capture', '2025-03-29 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(354, 30, 'molestias itaque non', 'INV-353MV', '100000.00', 'capture', '2025-02-27 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(355, 30, 'iste possimus non', 'INV-668RH', '100000.00', 'capture', '2025-04-29 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(356, 30, 'amet voluptatem accusamus', 'INV-043DA', '100000.00', 'capture', '2025-03-03 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(357, 30, 'alias minus inventore', 'INV-462XL', '100000.00', 'capture', '2025-01-29 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(358, 30, 'itaque est quis', 'INV-837CI', '100000.00', 'capture', '2025-04-04 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(359, 30, 'labore sed ullam', 'INV-897LH', '100000.00', 'capture', '2025-04-23 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(360, 30, 'enim libero et', 'INV-384TI', '100000.00', 'capture', '2025-02-25 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(361, 31, 'corporis aspernatur et', 'INV-260GV', '100000.00', 'capture', '2025-05-10 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(362, 31, 'ut facilis perferendis', 'INV-721ER', '100000.00', 'capture', '2025-01-30 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13');
INSERT INTO `tagihans` (`id`, `user_id`, `nama_tagihan`, `kode_tagihan`, `nominal`, `status`, `tanggal`, `created_at`, `updated_at`) VALUES
(363, 31, 'quia earum illo', 'INV-742PV', '100000.00', 'capture', '2025-01-31 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(364, 31, 'ut voluptate et', 'INV-536FE', '100000.00', 'capture', '2025-05-08 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(365, 31, 'et asperiores consequuntur', 'INV-764YU', '100000.00', 'capture', '2025-03-30 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(366, 31, 'est eum sit', 'INV-142BZ', '100000.00', 'capture', '2024-12-15 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(367, 31, 'voluptatem expedita magnam', 'INV-155UW', '100000.00', 'capture', '2025-04-28 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(368, 31, 'odit non est', 'INV-841IG', '100000.00', 'capture', '2025-02-20 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(369, 31, 'quia quo omnis', 'INV-366PW', '100000.00', 'capture', '2025-04-19 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(370, 31, 'ullam vel rerum', 'INV-922CW', '100000.00', 'capture', '2025-05-09 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(371, 31, 'atque sunt et', 'INV-390KD', '100000.00', 'capture', '2025-03-08 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(372, 31, 'necessitatibus est sunt', 'INV-820DW', '100000.00', 'capture', '2025-06-07 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(373, 32, 'quam saepe qui', 'INV-272TK', '100000.00', 'capture', '2025-06-06 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(374, 32, 'ut recusandae maxime', 'INV-923CF', '100000.00', 'capture', '2025-05-29 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(375, 32, 'aliquid et cupiditate', 'INV-669TJ', '100000.00', 'capture', '2024-12-18 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(376, 32, 'dolores error qui', 'INV-371YC', '100000.00', 'capture', '2024-12-28 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(377, 32, 'numquam omnis consectetur', 'INV-694CO', '100000.00', 'capture', '2025-04-06 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(378, 32, 'fugit amet eum', 'INV-959AX', '100000.00', 'capture', '2025-02-20 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(379, 32, 'consectetur suscipit sit', 'INV-482YZ', '100000.00', 'capture', '2025-03-17 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(380, 32, 'porro cupiditate veritatis', 'INV-891FY', '100000.00', 'capture', '2025-01-20 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(381, 32, 'eum rerum quidem', 'INV-118XT', '100000.00', 'capture', '2025-04-07 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(382, 32, 'eos expedita quia', 'INV-628DI', '100000.00', 'capture', '2025-03-18 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(383, 32, 'possimus cumque omnis', 'INV-116UN', '100000.00', 'capture', '2025-06-02 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(384, 32, 'veniam ut aperiam', 'INV-722ML', '100000.00', 'capture', '2025-05-15 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(385, 33, 'id accusantium fugiat', 'INV-222YZ', '100000.00', 'capture', '2025-01-30 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(386, 33, 'ipsa esse rerum', 'INV-171DW', '100000.00', 'capture', '2025-02-16 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(387, 33, 'ut quod qui', 'INV-755NO', '100000.00', 'capture', '2025-04-19 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(388, 33, 'aut repellendus incidunt', 'INV-724MH', '100000.00', 'capture', '2025-05-30 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(389, 33, 'dignissimos ut sed', 'INV-627VE', '100000.00', 'capture', '2025-06-03 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(390, 33, 'ad non labore', 'INV-804FI', '100000.00', 'capture', '2025-05-30 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(391, 33, 'explicabo corrupti ut', 'INV-507JJ', '100000.00', 'capture', '2025-02-10 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(392, 33, 'voluptas voluptatum dolores', 'INV-541XQ', '100000.00', 'capture', '2025-01-21 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(393, 33, 'non ut aperiam', 'INV-766AN', '100000.00', 'capture', '2025-05-16 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(394, 33, 'et adipisci itaque', 'INV-362DL', '100000.00', 'capture', '2025-05-22 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(395, 33, 'debitis nam doloremque', 'INV-424RG', '100000.00', 'capture', '2025-05-29 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(396, 33, 'sit ratione itaque', 'INV-336MQ', '100000.00', 'capture', '2025-02-13 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(397, 34, 'et sit id', 'INV-219HE', '100000.00', 'capture', '2024-12-27 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(398, 34, 'veniam expedita numquam', 'INV-250WY', '100000.00', 'capture', '2025-05-10 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(399, 34, 'consequatur ut ea', 'INV-785LQ', '100000.00', 'capture', '2025-02-08 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(400, 34, 'omnis soluta quisquam', 'INV-335KY', '100000.00', 'capture', '2025-01-15 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(401, 34, 'vero quas veniam', 'INV-993ZQ', '100000.00', 'capture', '2025-03-08 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(402, 34, 'nulla necessitatibus voluptatem', 'INV-017SZ', '100000.00', 'capture', '2025-03-08 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(403, 34, 'libero debitis voluptatem', 'INV-237UX', '100000.00', 'capture', '2025-06-04 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(404, 34, 'quaerat in quia', 'INV-121OH', '100000.00', 'capture', '2025-05-20 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(405, 34, 'beatae amet et', 'INV-934SE', '100000.00', 'capture', '2025-05-14 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(406, 34, 'quas sunt repellat', 'INV-666DE', '100000.00', 'capture', '2025-02-13 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(407, 34, 'voluptas tempore commodi', 'INV-347YQ', '100000.00', 'capture', '2025-04-14 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(408, 34, 'doloremque aut dolores', 'INV-610YH', '100000.00', 'capture', '2025-03-10 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(409, 35, 'et optio autem', 'INV-439OA', '100000.00', 'capture', '2025-01-04 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(410, 35, 'recusandae non deserunt', 'INV-562NS', '100000.00', 'capture', '2025-03-06 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(411, 35, 'quas corrupti hic', 'INV-369ET', '100000.00', 'capture', '2024-12-23 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(412, 35, 'explicabo ad officiis', 'INV-575AG', '100000.00', 'capture', '2025-01-01 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(413, 35, 'eum quis dolore', 'INV-673CJ', '100000.00', 'capture', '2025-05-01 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(414, 35, 'cumque voluptas consequatur', 'INV-404XE', '100000.00', 'capture', '2025-03-11 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(415, 35, 'quod pariatur voluptatibus', 'INV-529CQ', '100000.00', 'capture', '2025-01-02 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(416, 35, 'velit ut libero', 'INV-684TO', '100000.00', 'capture', '2025-04-21 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(417, 35, 'quaerat dignissimos tempora', 'INV-635SF', '100000.00', 'capture', '2025-02-08 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(418, 35, 'iure soluta error', 'INV-876SO', '100000.00', 'capture', '2025-04-19 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(419, 35, 'et et nihil', 'INV-020JS', '100000.00', 'capture', '2025-05-03 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(420, 35, 'facilis quia cumque', 'INV-944KP', '100000.00', 'capture', '2025-04-03 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(421, 36, 'aut qui suscipit', 'INV-896EH', '100000.00', 'capture', '2025-04-21 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(422, 36, 'officiis nihil et', 'INV-011UW', '100000.00', 'capture', '2025-03-27 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(423, 36, 'recusandae explicabo aspernatur', 'INV-635CO', '100000.00', 'capture', '2025-04-13 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(424, 36, 'impedit facere expedita', 'INV-224ND', '100000.00', 'capture', '2025-03-06 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(425, 36, 'exercitationem quo dolorem', 'INV-598FN', '100000.00', 'capture', '2025-03-04 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(426, 36, 'non occaecati quae', 'INV-598HA', '100000.00', 'capture', '2025-04-05 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(427, 36, 'non sunt ut', 'INV-023OO', '100000.00', 'capture', '2025-02-19 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(428, 36, 'natus possimus iste', 'INV-554GB', '100000.00', 'capture', '2025-03-05 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(429, 36, 'tempora sint perspiciatis', 'INV-528ID', '100000.00', 'capture', '2025-03-15 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(430, 36, 'amet voluptatem praesentium', 'INV-176KH', '100000.00', 'capture', '2025-06-09 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(431, 36, 'earum sint et', 'INV-924CD', '100000.00', 'capture', '2025-04-06 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(432, 36, 'sint ea aspernatur', 'INV-471WH', '100000.00', 'capture', '2025-04-19 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(433, 37, 'eos rerum omnis', 'INV-550GI', '100000.00', 'capture', '2025-05-22 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(434, 37, 'fugiat et accusantium', 'INV-011QC', '100000.00', 'capture', '2025-02-17 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(435, 37, 'et aut temporibus', 'INV-240ON', '100000.00', 'capture', '2025-04-10 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(436, 37, 'voluptates minima qui', 'INV-325EY', '100000.00', 'capture', '2025-04-28 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(437, 37, 'omnis pariatur qui', 'INV-107TL', '100000.00', 'capture', '2025-03-01 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(438, 37, 'consequatur quos cumque', 'INV-070SA', '100000.00', 'capture', '2025-02-22 00:00:00', '2025-06-14 17:04:13', '2025-06-14 17:04:13'),
(439, 37, 'suscipit hic voluptatibus', 'INV-606WY', '100000.00', 'capture', '2025-05-11 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(440, 37, 'amet quas porro', 'INV-801EZ', '100000.00', 'capture', '2024-12-22 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(441, 37, 'dolor voluptas non', 'INV-296KL', '100000.00', 'capture', '2024-12-23 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(442, 37, 'minus sed inventore', 'INV-049DB', '100000.00', 'capture', '2025-01-17 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(443, 37, 'quasi molestiae omnis', 'INV-040ZM', '100000.00', 'capture', '2025-06-04 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(444, 37, 'cumque architecto repudiandae', 'INV-930BO', '100000.00', 'capture', '2025-04-03 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(445, 38, 'vel odio aut', 'INV-889LB', '100000.00', 'capture', '2025-04-28 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(446, 38, 'explicabo qui accusamus', 'INV-518UL', '100000.00', 'capture', '2024-12-19 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(447, 38, 'repellendus quia eligendi', 'INV-334AE', '100000.00', 'capture', '2025-01-14 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(448, 38, 'possimus ratione repellendus', 'INV-647IM', '100000.00', 'capture', '2025-04-09 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(449, 38, 'atque et est', 'INV-405NG', '100000.00', 'capture', '2025-06-06 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(450, 38, 'earum officia temporibus', 'INV-508LB', '100000.00', 'capture', '2025-02-06 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(451, 38, 'consequatur nulla tenetur', 'INV-854BB', '100000.00', 'capture', '2024-12-21 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(452, 38, 'libero et et', 'INV-286ZW', '100000.00', 'capture', '2025-02-16 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(453, 38, 'sed modi ducimus', 'INV-000NB', '100000.00', 'capture', '2025-03-30 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(454, 38, 'est amet saepe', 'INV-206VT', '100000.00', 'capture', '2025-03-20 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(455, 38, 'consequatur dolorum odio', 'INV-466UO', '100000.00', 'capture', '2025-04-04 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(456, 38, 'asperiores et unde', 'INV-626NX', '100000.00', 'capture', '2025-04-09 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(457, 39, 'est mollitia dolores', 'INV-761PH', '100000.00', 'capture', '2025-01-16 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(458, 39, 'doloremque id quis', 'INV-262GM', '100000.00', 'capture', '2025-02-21 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(459, 39, 'eligendi sunt sit', 'INV-183IF', '100000.00', 'capture', '2025-06-07 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(460, 39, 'aut quis esse', 'INV-440KF', '100000.00', 'capture', '2025-01-28 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(461, 39, 'perspiciatis numquam ullam', 'INV-162KE', '100000.00', 'capture', '2025-05-06 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(462, 39, 'officia voluptatem repellat', 'INV-827SA', '100000.00', 'capture', '2024-12-23 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(463, 39, 'recusandae molestias qui', 'INV-971KN', '100000.00', 'capture', '2025-02-23 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(464, 39, 'et reprehenderit enim', 'INV-746JZ', '100000.00', 'capture', '2025-05-29 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(465, 39, 'ex explicabo et', 'INV-361HZ', '100000.00', 'capture', '2025-02-19 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(466, 39, 'officia quod cum', 'INV-697TT', '100000.00', 'capture', '2025-01-10 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(467, 39, 'minima nemo soluta', 'INV-552KO', '100000.00', 'capture', '2025-01-29 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(468, 39, 'est sit vel', 'INV-073XJ', '100000.00', 'capture', '2025-01-25 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(469, 40, 'nihil iusto ea', 'INV-713ZL', '100000.00', 'capture', '2025-03-19 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(470, 40, 'itaque molestiae qui', 'INV-730LT', '100000.00', 'capture', '2024-12-29 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(471, 40, 'vero nulla et', 'INV-429SV', '100000.00', 'capture', '2025-01-13 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(472, 40, 'voluptas ut consequatur', 'INV-145VH', '100000.00', 'capture', '2025-03-25 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(473, 40, 'sit recusandae aliquid', 'INV-317AG', '100000.00', 'capture', '2025-02-03 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(474, 40, 'dolorum laboriosam voluptates', 'INV-449LH', '100000.00', 'capture', '2025-02-13 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(475, 40, 'maxime et recusandae', 'INV-998IF', '100000.00', 'capture', '2025-05-06 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(476, 40, 'provident hic maxime', 'INV-161IG', '100000.00', 'capture', '2025-04-07 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(477, 40, 'maxime laborum amet', 'INV-813AJ', '100000.00', 'capture', '2025-06-10 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(478, 40, 'distinctio sit aliquam', 'INV-499MF', '100000.00', 'capture', '2025-05-18 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(479, 40, 'earum tenetur aspernatur', 'INV-877GU', '100000.00', 'capture', '2025-02-02 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(480, 40, 'molestiae repudiandae nihil', 'INV-938XG', '100000.00', 'capture', '2024-12-30 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(481, 41, 'asperiores voluptatibus voluptas', 'INV-573AA', '100000.00', 'capture', '2025-03-18 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(482, 41, 'illo velit qui', 'INV-761UN', '100000.00', 'capture', '2025-01-25 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(483, 41, 'iste deleniti voluptatem', 'INV-644CH', '100000.00', 'capture', '2025-01-01 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(484, 41, 'aliquid qui et', 'INV-951HO', '100000.00', 'capture', '2025-05-13 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(485, 41, 'suscipit magni culpa', 'INV-459CQ', '100000.00', 'capture', '2025-02-01 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(486, 41, 'labore quibusdam eveniet', 'INV-490RO', '100000.00', 'capture', '2025-03-07 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(487, 41, 'aperiam iste voluptatibus', 'INV-804ZZ', '100000.00', 'capture', '2025-03-27 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(488, 41, 'harum ipsam eaque', 'INV-036PB', '100000.00', 'capture', '2024-12-19 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(489, 41, 'libero quisquam iste', 'INV-330IO', '100000.00', 'capture', '2024-12-29 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(490, 41, 'totam et ab', 'INV-559GS', '100000.00', 'capture', '2025-04-06 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(491, 41, 'qui facilis modi', 'INV-997ZO', '100000.00', 'capture', '2025-02-26 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(492, 41, 'enim et doloremque', 'INV-628RP', '100000.00', 'capture', '2025-05-05 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(493, 42, 'ut cupiditate est', 'INV-733LO', '100000.00', 'capture', '2024-12-28 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(494, 42, 'perferendis qui nisi', 'INV-693RC', '100000.00', 'capture', '2025-01-07 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(495, 42, 'blanditiis sit debitis', 'INV-495HI', '100000.00', 'capture', '2025-01-01 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(496, 42, 'hic vero nemo', 'INV-129GH', '100000.00', 'capture', '2025-01-08 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(497, 42, 'aut sequi sit', 'INV-993KF', '100000.00', 'capture', '2025-04-28 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(498, 42, 'et maxime similique', 'INV-779GM', '100000.00', 'capture', '2025-01-06 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(499, 42, 'quas at eligendi', 'INV-789NG', '100000.00', 'capture', '2025-03-11 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(500, 42, 'illo maxime voluptatibus', 'INV-918FD', '100000.00', 'capture', '2025-01-04 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(501, 42, 'enim sed accusamus', 'INV-715KT', '100000.00', 'capture', '2024-12-21 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(502, 42, 'sed qui doloribus', 'INV-502CT', '100000.00', 'capture', '2025-04-03 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(503, 42, 'quia earum nisi', 'INV-042MN', '100000.00', 'capture', '2025-04-16 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(504, 42, 'illum fuga enim', 'INV-575EW', '100000.00', 'capture', '2025-01-25 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(505, 43, 'officia atque possimus', 'INV-311DN', '100000.00', 'capture', '2025-01-09 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(506, 43, 'neque dicta placeat', 'INV-463LZ', '100000.00', 'capture', '2025-01-02 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(507, 43, 'atque rem et', 'INV-956CG', '100000.00', 'capture', '2024-12-18 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(508, 43, 'architecto blanditiis non', 'INV-951GC', '100000.00', 'capture', '2025-06-05 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(509, 43, 'non est magnam', 'INV-964FG', '100000.00', 'capture', '2025-03-07 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(510, 43, 'consequatur ea cumque', 'INV-084XE', '100000.00', 'capture', '2025-03-19 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(511, 43, 'ullam molestiae ut', 'INV-366TW', '100000.00', 'capture', '2025-04-02 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(512, 43, 'minus necessitatibus tenetur', 'INV-271AY', '100000.00', 'capture', '2025-01-13 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(513, 43, 'eius ad praesentium', 'INV-211FX', '100000.00', 'capture', '2025-06-11 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(514, 43, 'labore dolorem ut', 'INV-773YZ', '100000.00', 'capture', '2025-01-19 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(515, 43, 'voluptates animi blanditiis', 'INV-657DB', '100000.00', 'capture', '2025-01-14 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(516, 43, 'magni veniam consectetur', 'INV-031VL', '100000.00', 'capture', '2025-05-04 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(517, 44, 'quia voluptatem est', 'INV-221SR', '100000.00', 'capture', '2025-02-03 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(518, 44, 'quia ad culpa', 'INV-714BZ', '100000.00', 'capture', '2025-03-21 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(519, 44, 'sit assumenda temporibus', 'INV-916QY', '100000.00', 'capture', '2024-12-25 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(520, 44, 'aut dignissimos illum', 'INV-113FA', '100000.00', 'capture', '2024-12-17 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(521, 44, 'omnis eum sed', 'INV-003KR', '100000.00', 'capture', '2025-04-20 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(522, 44, 'delectus voluptates nesciunt', 'INV-657PW', '100000.00', 'capture', '2025-01-04 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(523, 44, 'temporibus exercitationem distinctio', 'INV-939GX', '100000.00', 'capture', '2025-02-16 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(524, 44, 'magnam et fugit', 'INV-162LH', '100000.00', 'capture', '2025-05-02 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(525, 44, 'aut et quo', 'INV-427US', '100000.00', 'capture', '2025-02-20 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(526, 44, 'ipsa vero omnis', 'INV-782QZ', '100000.00', 'capture', '2024-12-25 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(527, 44, 'fuga cum quibusdam', 'INV-000JO', '100000.00', 'capture', '2025-02-05 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(528, 44, 'sunt aliquam qui', 'INV-918WV', '100000.00', 'capture', '2024-12-18 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(529, 45, 'natus rerum sint', 'INV-391JN', '100000.00', 'capture', '2025-04-18 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(530, 45, 'dolor fugiat facilis', 'INV-954UL', '100000.00', 'capture', '2025-02-18 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(531, 45, 'ut beatae aut', 'INV-375QC', '100000.00', 'capture', '2025-06-14 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(532, 45, 'vel voluptatum quo', 'INV-101KF', '100000.00', 'capture', '2024-12-20 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(533, 45, 'voluptatem nobis vitae', 'INV-134WL', '100000.00', 'capture', '2025-01-20 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(534, 45, 'sed accusamus nesciunt', 'INV-440ZO', '100000.00', 'capture', '2025-05-01 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(535, 45, 'iure quae est', 'INV-770BD', '100000.00', 'capture', '2025-02-05 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(536, 45, 'laudantium nihil quae', 'INV-026BF', '100000.00', 'capture', '2025-02-16 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(537, 45, 'laudantium sequi et', 'INV-574OU', '100000.00', 'capture', '2025-01-27 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(538, 45, 'omnis blanditiis ut', 'INV-071MW', '100000.00', 'capture', '2024-12-25 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(539, 45, 'voluptatem cumque ut', 'INV-241JH', '100000.00', 'capture', '2025-02-03 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(540, 45, 'aliquam ipsa facere', 'INV-065UU', '100000.00', 'capture', '2025-01-17 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(541, 46, 'et voluptates soluta', 'INV-416DH', '100000.00', 'capture', '2025-06-01 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(542, 46, 'id et mollitia', 'INV-599SJ', '100000.00', 'capture', '2025-03-02 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(543, 46, 'sit minus et', 'INV-730SY', '100000.00', 'capture', '2025-04-20 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(544, 46, 'veniam at non', 'INV-118YH', '100000.00', 'capture', '2024-12-17 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(545, 46, 'aut at ducimus', 'INV-318HK', '100000.00', 'capture', '2025-03-06 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(546, 46, 'placeat quia est', 'INV-054RC', '100000.00', 'capture', '2025-03-07 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(547, 46, 'neque sit quaerat', 'INV-652VT', '100000.00', 'capture', '2025-03-22 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(548, 46, 'molestiae corporis amet', 'INV-736US', '100000.00', 'capture', '2025-02-19 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(549, 46, 'quasi ut reprehenderit', 'INV-640KB', '100000.00', 'capture', '2025-05-08 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(550, 46, 'quis fugit libero', 'INV-756VD', '100000.00', 'capture', '2025-05-22 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(551, 46, 'voluptate a rerum', 'INV-553AZ', '100000.00', 'capture', '2025-02-02 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(552, 46, 'delectus velit et', 'INV-585WU', '100000.00', 'capture', '2025-05-18 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(553, 47, 'dolorem iste et', 'INV-773UA', '100000.00', 'capture', '2025-06-14 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(554, 47, 'soluta sit sed', 'INV-205VQ', '100000.00', 'capture', '2025-05-26 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(555, 47, 'quibusdam commodi nesciunt', 'INV-030YU', '100000.00', 'capture', '2025-06-14 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(556, 47, 'et ut quibusdam', 'INV-172AI', '100000.00', 'capture', '2024-12-26 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(557, 47, 'facere quisquam molestiae', 'INV-421VZ', '100000.00', 'capture', '2025-05-17 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(558, 47, 'earum ea ut', 'INV-626QU', '100000.00', 'capture', '2024-12-29 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(559, 47, 'maiores incidunt sed', 'INV-690AN', '100000.00', 'capture', '2025-05-25 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(560, 47, 'cum corporis quod', 'INV-339AX', '100000.00', 'capture', '2025-02-15 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(561, 47, 'maxime delectus suscipit', 'INV-576ZY', '100000.00', 'capture', '2024-12-15 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(562, 47, 'illum tempore fugit', 'INV-286IA', '100000.00', 'capture', '2025-02-22 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(563, 47, 'veniam eveniet inventore', 'INV-330ID', '100000.00', 'capture', '2025-06-13 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(564, 47, 'enim adipisci quod', 'INV-636CI', '100000.00', 'capture', '2025-03-25 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(565, 48, 'minima sed enim', 'INV-663SK', '100000.00', 'capture', '2025-03-14 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(566, 48, 'voluptatem nemo ipsam', 'INV-267GL', '100000.00', 'capture', '2025-06-03 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(567, 48, 'ut eaque et', 'INV-873PK', '100000.00', 'capture', '2025-03-11 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(568, 48, 'illo reprehenderit optio', 'INV-781RQ', '100000.00', 'capture', '2025-04-24 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(569, 48, 'earum iusto provident', 'INV-548YA', '100000.00', 'capture', '2025-05-20 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(570, 48, 'a inventore dolorum', 'INV-701SN', '100000.00', 'capture', '2025-06-14 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(571, 48, 'ipsam laboriosam asperiores', 'INV-611NU', '100000.00', 'capture', '2025-01-28 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(572, 48, 'repellat explicabo architecto', 'INV-060RT', '100000.00', 'capture', '2024-12-24 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(573, 48, 'placeat iusto et', 'INV-283TV', '100000.00', 'capture', '2025-04-05 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(574, 48, 'dolor vitae modi', 'INV-512PI', '100000.00', 'capture', '2025-03-21 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(575, 48, 'et consequuntur dolores', 'INV-713WQ', '100000.00', 'capture', '2025-03-24 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(576, 48, 'atque laborum iste', 'INV-882CU', '100000.00', 'capture', '2025-05-16 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(577, 49, 'et repellat dolores', 'INV-726LU', '100000.00', 'capture', '2025-05-28 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(578, 49, 'dignissimos magni exercitationem', 'INV-496RG', '100000.00', 'capture', '2025-01-04 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(579, 49, 'perspiciatis maxime in', 'INV-048GU', '100000.00', 'capture', '2025-03-09 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(580, 49, 'mollitia omnis incidunt', 'INV-628WA', '100000.00', 'capture', '2025-05-13 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(581, 49, 'ea pariatur qui', 'INV-366JE', '100000.00', 'capture', '2025-01-16 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(582, 49, 'voluptate sed hic', 'INV-368EB', '100000.00', 'capture', '2025-03-26 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(583, 49, 'ipsum dolor tempore', 'INV-948XX', '100000.00', 'capture', '2025-01-17 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(584, 49, 'nesciunt ad adipisci', 'INV-685NF', '100000.00', 'capture', '2025-02-11 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(585, 49, 'voluptatibus nihil reiciendis', 'INV-033XU', '100000.00', 'capture', '2025-05-01 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(586, 49, 'est numquam dignissimos', 'INV-042HL', '100000.00', 'capture', '2025-01-31 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(587, 49, 'quaerat rerum nostrum', 'INV-492VK', '100000.00', 'capture', '2025-05-26 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(588, 49, 'ut dolor modi', 'INV-049AK', '100000.00', 'capture', '2025-02-04 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(589, 50, 'mollitia debitis est', 'INV-866WT', '100000.00', 'capture', '2024-12-28 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(590, 50, 'aliquid error numquam', 'INV-183KS', '100000.00', 'capture', '2024-12-26 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(591, 50, 'cupiditate ut placeat', 'INV-577AI', '100000.00', 'capture', '2025-04-01 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(592, 50, 'cumque libero accusantium', 'INV-390TA', '100000.00', 'capture', '2025-02-27 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(593, 50, 'animi repellendus atque', 'INV-703TH', '100000.00', 'capture', '2025-04-25 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(594, 50, 'saepe dolore a', 'INV-884ZC', '100000.00', 'capture', '2025-04-09 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(595, 50, 'natus quia aut', 'INV-728QL', '100000.00', 'capture', '2025-01-09 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(596, 50, 'iure blanditiis omnis', 'INV-328RD', '100000.00', 'capture', '2025-05-17 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(597, 50, 'velit occaecati illum', 'INV-098HC', '100000.00', 'capture', '2025-03-31 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(598, 50, 'voluptas sit eius', 'INV-753BC', '100000.00', 'capture', '2024-12-23 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(599, 50, 'eaque culpa quia', 'INV-604VG', '100000.00', 'capture', '2025-02-03 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(600, 50, 'sed velit sunt', 'INV-260QH', '100000.00', 'capture', '2025-02-06 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(601, 51, 'ipsum adipisci quas', 'INV-880SI', '100000.00', 'capture', '2025-06-10 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(602, 51, 'consequatur ut quam', 'INV-398MP', '100000.00', 'capture', '2025-03-30 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(603, 51, 'voluptatibus at distinctio', 'INV-015DS', '100000.00', 'capture', '2025-02-12 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(604, 51, 'est maxime magnam', 'INV-418OH', '100000.00', 'capture', '2025-05-12 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(605, 51, 'autem veritatis voluptatem', 'INV-686YI', '100000.00', 'capture', '2025-01-29 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(606, 51, 'voluptatem dolore quibusdam', 'INV-497BC', '100000.00', 'capture', '2025-03-07 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(607, 51, 'dolores suscipit ut', 'INV-294AO', '100000.00', 'capture', '2025-06-09 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(608, 51, 'rerum quia quia', 'INV-227SV', '100000.00', 'capture', '2025-02-18 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(609, 51, 'aliquam earum amet', 'INV-452JI', '100000.00', 'capture', '2025-02-17 00:00:00', '2025-06-14 17:04:14', '2025-06-14 17:04:14'),
(610, 51, 'rerum natus tempore', 'INV-068GD', '100000.00', 'capture', '2025-01-30 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(611, 51, 'quae quod maxime', 'INV-541CP', '100000.00', 'capture', '2024-12-30 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(612, 51, 'magnam atque mollitia', 'INV-710TR', '100000.00', 'capture', '2025-04-02 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(613, 52, 'cupiditate quia culpa', 'INV-746JS', '100000.00', 'capture', '2025-05-12 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(614, 52, 'et ab suscipit', 'INV-669UE', '100000.00', 'capture', '2025-01-15 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(615, 52, 'itaque repellendus labore', 'INV-050UF', '100000.00', 'capture', '2025-02-14 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(616, 52, 'enim ducimus et', 'INV-425HL', '100000.00', 'capture', '2025-01-15 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(617, 52, 'molestiae et illo', 'INV-010ZM', '100000.00', 'capture', '2025-05-06 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(618, 52, 'et et quidem', 'INV-983BB', '100000.00', 'capture', '2025-04-11 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(619, 52, 'temporibus et magni', 'INV-180BT', '100000.00', 'capture', '2025-02-02 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(620, 52, 'distinctio sed corporis', 'INV-757GE', '100000.00', 'capture', '2025-03-01 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(621, 52, 'accusantium atque quam', 'INV-209RL', '100000.00', 'capture', '2025-04-08 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(622, 52, 'vel dolores expedita', 'INV-446TE', '100000.00', 'capture', '2024-12-20 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(623, 52, 'inventore repellendus eos', 'INV-230OL', '100000.00', 'capture', '2025-05-23 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(624, 52, 'et adipisci ut', 'INV-123SV', '100000.00', 'capture', '2025-02-25 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(625, 53, 'unde dicta aut', 'INV-681XI', '100000.00', 'capture', '2025-02-08 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(626, 53, 'consectetur omnis vel', 'INV-981VY', '100000.00', 'capture', '2025-03-28 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(627, 53, 'nemo eos temporibus', 'INV-946VJ', '100000.00', 'capture', '2025-04-07 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(628, 53, 'qui velit deserunt', 'INV-207BE', '100000.00', 'capture', '2025-04-17 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(629, 53, 'vitae assumenda pariatur', 'INV-895RK', '100000.00', 'capture', '2025-01-23 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(630, 53, 'iusto et voluptas', 'INV-973AD', '100000.00', 'capture', '2025-03-13 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(631, 53, 'qui enim quasi', 'INV-554MC', '100000.00', 'capture', '2025-03-10 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(632, 53, 'quaerat dolore veritatis', 'INV-882KM', '100000.00', 'capture', '2025-03-21 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(633, 53, 'fuga possimus eum', 'INV-319PH', '100000.00', 'capture', '2025-05-30 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(634, 53, 'labore et porro', 'INV-552MR', '100000.00', 'capture', '2025-04-04 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(635, 53, 'quibusdam quia eligendi', 'INV-830ZA', '100000.00', 'capture', '2025-04-14 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(636, 53, 'est sed vel', 'INV-367CF', '100000.00', 'capture', '2025-05-26 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(637, 54, 'id voluptatibus earum', 'INV-394BT', '100000.00', 'capture', '2025-03-13 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(638, 54, 'qui fugiat adipisci', 'INV-016RP', '100000.00', 'capture', '2025-04-24 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(639, 54, 'quia ipsa dignissimos', 'INV-701RT', '100000.00', 'capture', '2025-01-20 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(640, 54, 'dignissimos aliquam possimus', 'INV-849MH', '100000.00', 'capture', '2025-01-13 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(641, 54, 'placeat blanditiis laudantium', 'INV-139QS', '100000.00', 'capture', '2025-04-09 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(642, 54, 'est saepe animi', 'INV-456QH', '100000.00', 'capture', '2025-02-10 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(643, 54, 'porro nisi magni', 'INV-217VM', '100000.00', 'capture', '2025-01-02 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(644, 54, 'repudiandae autem impedit', 'INV-326GB', '100000.00', 'capture', '2025-01-22 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(645, 54, 'beatae fugit doloribus', 'INV-373SN', '100000.00', 'capture', '2025-01-18 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(646, 54, 'quis magnam quidem', 'INV-272RX', '100000.00', 'capture', '2025-02-05 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(647, 54, 'et molestiae unde', 'INV-124HV', '100000.00', 'capture', '2025-04-21 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(648, 54, 'sunt sed voluptatum', 'INV-989XO', '100000.00', 'capture', '2025-03-19 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(649, 55, 'ipsum eos dolorum', 'INV-163AN', '100000.00', 'capture', '2025-05-04 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(650, 55, 'id voluptates sint', 'INV-502BA', '100000.00', 'capture', '2025-02-24 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(651, 55, 'accusamus eos nostrum', 'INV-211XZ', '100000.00', 'capture', '2025-05-08 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(652, 55, 'ducimus rerum officiis', 'INV-513ZT', '100000.00', 'capture', '2025-03-16 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(653, 55, 'quasi adipisci aliquam', 'INV-671CQ', '100000.00', 'capture', '2025-04-09 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(654, 55, 'molestiae fugit expedita', 'INV-752GL', '100000.00', 'capture', '2025-01-09 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(655, 55, 'atque quis necessitatibus', 'INV-490OD', '100000.00', 'capture', '2025-03-08 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(656, 55, 'ut nulla rem', 'INV-631GW', '100000.00', 'capture', '2025-01-04 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(657, 55, 'earum autem eum', 'INV-119IR', '100000.00', 'capture', '2025-05-02 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(658, 55, 'molestias incidunt similique', 'INV-907LQ', '100000.00', 'capture', '2024-12-31 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(659, 55, 'quasi a et', 'INV-212RL', '100000.00', 'capture', '2024-12-25 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(660, 55, 'blanditiis ut dignissimos', 'INV-847SZ', '100000.00', 'capture', '2025-06-14 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(661, 56, 'labore veritatis velit', 'INV-104QQ', '100000.00', 'capture', '2025-02-04 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(662, 56, 'qui aut quod', 'INV-630SU', '100000.00', 'capture', '2024-12-16 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(663, 56, 'distinctio rerum quae', 'INV-183QS', '100000.00', 'capture', '2025-01-13 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(664, 56, 'quia occaecati voluptas', 'INV-839JD', '100000.00', 'capture', '2025-04-13 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(665, 56, 'ut velit doloremque', 'INV-526DN', '100000.00', 'capture', '2025-03-01 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(666, 56, 'consectetur et maxime', 'INV-400VU', '100000.00', 'capture', '2025-04-28 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(667, 56, 'tempora rerum et', 'INV-586OD', '100000.00', 'capture', '2025-01-30 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(668, 56, 'enim ipsa et', 'INV-540IL', '100000.00', 'capture', '2025-05-25 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(669, 56, 'ipsum eos maiores', 'INV-100KE', '100000.00', 'capture', '2025-03-13 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(670, 56, 'et sunt sequi', 'INV-648ZT', '100000.00', 'capture', '2025-02-21 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(671, 56, 'tempora aliquid est', 'INV-312FE', '100000.00', 'capture', '2025-04-08 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(672, 56, 'fugiat aut est', 'INV-355HC', '100000.00', 'capture', '2025-04-20 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(673, 57, 'unde quam aut', 'INV-224GT', '100000.00', 'capture', '2024-12-26 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(674, 57, 'laboriosam quo aut', 'INV-411UX', '100000.00', 'capture', '2025-05-29 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(675, 57, 'eligendi et similique', 'INV-661EV', '100000.00', 'capture', '2025-02-24 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(676, 57, 'vero ullam vero', 'INV-652GN', '100000.00', 'capture', '2025-05-25 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(677, 57, 'nostrum rerum assumenda', 'INV-860DZ', '100000.00', 'capture', '2025-01-19 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(678, 57, 'adipisci ipsum quibusdam', 'INV-795BF', '100000.00', 'capture', '2025-04-16 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(679, 57, 'maiores maxime asperiores', 'INV-427WX', '100000.00', 'capture', '2024-12-28 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(680, 57, 'impedit officia blanditiis', 'INV-918QL', '100000.00', 'capture', '2025-01-16 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(681, 57, 'sint ullam assumenda', 'INV-061EK', '100000.00', 'capture', '2025-01-06 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(682, 57, 'qui dolorem nulla', 'INV-753BV', '100000.00', 'capture', '2025-04-24 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(683, 57, 'eveniet fuga rerum', 'INV-542FV', '100000.00', 'capture', '2025-01-11 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(684, 57, 'accusantium qui iusto', 'INV-087DQ', '100000.00', 'capture', '2025-04-13 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(685, 58, 'iste et blanditiis', 'INV-814VW', '100000.00', 'capture', '2025-05-14 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(686, 58, 'cum esse tenetur', 'INV-888BX', '100000.00', 'capture', '2025-02-13 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(687, 58, 'animi blanditiis quaerat', 'INV-948ZA', '100000.00', 'capture', '2025-06-10 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(688, 58, 'ea pariatur reiciendis', 'INV-413JN', '100000.00', 'capture', '2025-02-09 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(689, 58, 'eum mollitia alias', 'INV-608VV', '100000.00', 'capture', '2025-03-08 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(690, 58, 'deleniti voluptas quia', 'INV-828JT', '100000.00', 'capture', '2025-03-23 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(691, 58, 'voluptatem atque in', 'INV-476FL', '100000.00', 'capture', '2025-01-30 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(692, 58, 'pariatur vero minus', 'INV-048JR', '100000.00', 'capture', '2024-12-15 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(693, 58, 'voluptatem ad perferendis', 'INV-457MF', '100000.00', 'capture', '2024-12-26 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(694, 58, 'omnis quas illo', 'INV-453BI', '100000.00', 'capture', '2025-05-10 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(695, 58, 'doloremque omnis aut', 'INV-134WD', '100000.00', 'capture', '2025-01-07 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(696, 58, 'et molestiae labore', 'INV-566CO', '100000.00', 'capture', '2024-12-27 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(697, 59, 'quibusdam qui voluptates', 'INV-961BP', '100000.00', 'capture', '2025-03-02 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(698, 59, 'voluptatum laborum magnam', 'INV-833EG', '100000.00', 'capture', '2025-01-29 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(699, 59, 'aut animi ut', 'INV-660LP', '100000.00', 'capture', '2025-06-03 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(700, 59, 'eum consequatur vitae', 'INV-135QG', '100000.00', 'capture', '2025-05-25 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(701, 59, 'et ratione vero', 'INV-558TB', '100000.00', 'capture', '2025-04-03 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(702, 59, 'rerum nulla nihil', 'INV-080IP', '100000.00', 'capture', '2025-05-30 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(703, 59, 'in exercitationem placeat', 'INV-840ES', '100000.00', 'capture', '2025-04-07 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(704, 59, 'ut et doloribus', 'INV-363SI', '100000.00', 'capture', '2025-01-02 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(705, 59, 'alias eum tempora', 'INV-261SJ', '100000.00', 'capture', '2024-12-24 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(706, 59, 'officiis rerum dolor', 'INV-273LS', '100000.00', 'capture', '2025-04-14 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(707, 59, 'officia voluptatem recusandae', 'INV-448HZ', '100000.00', 'capture', '2024-12-22 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(708, 59, 'velit ex dolores', 'INV-953OR', '100000.00', 'capture', '2024-12-31 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(709, 60, 'asperiores unde ab', 'INV-702AI', '100000.00', 'capture', '2025-01-21 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(710, 60, 'ea et sequi', 'INV-024UP', '100000.00', 'capture', '2025-02-04 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(711, 60, 'illo corrupti odio', 'INV-136DF', '100000.00', 'capture', '2025-01-18 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(712, 60, 'earum in quia', 'INV-001DX', '100000.00', 'capture', '2025-05-19 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(713, 60, 'quaerat qui voluptatem', 'INV-460XG', '100000.00', 'capture', '2025-06-12 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(714, 60, 'veniam sit porro', 'INV-460ZU', '100000.00', 'capture', '2025-01-14 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(715, 60, 'natus natus sint', 'INV-111SB', '100000.00', 'capture', '2025-03-22 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(716, 60, 'autem illum soluta', 'INV-441WP', '100000.00', 'capture', '2025-02-13 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(717, 60, 'autem eum maiores', 'INV-809NK', '100000.00', 'capture', '2024-12-16 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(718, 60, 'impedit eos quia', 'INV-354IO', '100000.00', 'capture', '2025-05-26 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(719, 60, 'provident voluptas veniam', 'INV-985NW', '100000.00', 'capture', '2025-04-29 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(720, 60, 'aut similique doloremque', 'INV-741AE', '100000.00', 'capture', '2024-12-30 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(721, 61, 'nihil repudiandae nobis', 'INV-015LB', '100000.00', 'capture', '2024-12-20 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(722, 61, 'corporis pariatur quaerat', 'INV-241NY', '100000.00', 'capture', '2025-04-01 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15');
INSERT INTO `tagihans` (`id`, `user_id`, `nama_tagihan`, `kode_tagihan`, `nominal`, `status`, `tanggal`, `created_at`, `updated_at`) VALUES
(723, 61, 'amet earum maxime', 'INV-060YR', '100000.00', 'capture', '2024-12-24 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(724, 61, 'iure illo et', 'INV-441LP', '100000.00', 'capture', '2025-01-08 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(725, 61, 'consequatur consequuntur tempora', 'INV-732XU', '100000.00', 'capture', '2025-06-01 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(726, 61, 'voluptatem adipisci unde', 'INV-828NF', '100000.00', 'capture', '2025-02-07 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(727, 61, 'impedit dolorum esse', 'INV-776JS', '100000.00', 'capture', '2025-05-27 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(728, 61, 'autem quia fugiat', 'INV-556YA', '100000.00', 'capture', '2025-04-23 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(729, 61, 'mollitia nostrum accusantium', 'INV-767VB', '100000.00', 'capture', '2025-01-10 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(730, 61, 'est natus ipsa', 'INV-263BT', '100000.00', 'capture', '2025-01-30 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(731, 61, 'voluptatem dolores consequuntur', 'INV-934PI', '100000.00', 'capture', '2025-05-02 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(732, 61, 'tempore molestiae est', 'INV-431KR', '100000.00', 'capture', '2025-05-18 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(733, 62, 'corrupti quos illum', 'INV-512FO', '100000.00', 'capture', '2025-04-20 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(734, 62, 'ullam eius eaque', 'INV-141CU', '100000.00', 'capture', '2025-01-14 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(735, 62, 'magni ut non', 'INV-950FP', '100000.00', 'capture', '2025-01-19 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(736, 62, 'rem aperiam sint', 'INV-563VR', '100000.00', 'capture', '2025-04-15 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(737, 62, 'dolorem vitae expedita', 'INV-870GD', '100000.00', 'capture', '2024-12-27 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(738, 62, 'esse consequatur ut', 'INV-524NE', '100000.00', 'capture', '2024-12-19 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(739, 62, 'exercitationem dolorum iste', 'INV-694AE', '100000.00', 'capture', '2025-03-28 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(740, 62, 'cupiditate rem dolor', 'INV-816HN', '100000.00', 'capture', '2025-01-14 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(741, 62, 'autem voluptatum voluptas', 'INV-008YJ', '100000.00', 'capture', '2025-05-23 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(742, 62, 'incidunt vel nihil', 'INV-920YV', '100000.00', 'capture', '2025-01-24 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(743, 62, 'perspiciatis laboriosam nesciunt', 'INV-975KG', '100000.00', 'capture', '2024-12-18 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(744, 62, 'voluptas dolorem accusantium', 'INV-568AB', '100000.00', 'capture', '2025-05-28 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(745, 63, 'dolores quis consequatur', 'INV-543DH', '100000.00', 'capture', '2025-04-16 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(746, 63, 'sit tempora mollitia', 'INV-220WB', '100000.00', 'capture', '2025-04-13 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(747, 63, 'illum minus vero', 'INV-199PF', '100000.00', 'capture', '2025-01-18 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(748, 63, 'voluptatibus rerum voluptas', 'INV-357YA', '100000.00', 'capture', '2024-12-29 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(749, 63, 'sint aut dolor', 'INV-384IT', '100000.00', 'capture', '2025-04-07 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(750, 63, 'sit ut ut', 'INV-395VK', '100000.00', 'capture', '2025-05-08 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(751, 63, 'dolor molestiae aut', 'INV-755UN', '100000.00', 'capture', '2025-03-17 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(752, 63, 'sit eius molestiae', 'INV-411NA', '100000.00', 'capture', '2025-02-21 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(753, 63, 'animi adipisci pariatur', 'INV-832BL', '100000.00', 'capture', '2025-04-07 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(754, 63, 'fuga ratione in', 'INV-146PF', '100000.00', 'capture', '2025-01-11 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(755, 63, 'non inventore voluptatibus', 'INV-408XM', '100000.00', 'capture', '2025-02-17 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(756, 63, 'ut id nihil', 'INV-156WV', '100000.00', 'capture', '2025-03-16 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(757, 64, 'iure est quia', 'INV-058AN', '100000.00', 'capture', '2025-06-09 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(758, 64, 'doloribus eum aut', 'INV-343VW', '100000.00', 'capture', '2025-03-13 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(759, 64, 'quibusdam vel quia', 'INV-407RB', '100000.00', 'capture', '2024-12-22 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(760, 64, 'adipisci accusamus enim', 'INV-195GU', '100000.00', 'capture', '2025-04-20 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(761, 64, 'itaque consequatur corporis', 'INV-928RY', '100000.00', 'capture', '2025-01-25 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(762, 64, 'inventore voluptatem ipsam', 'INV-395JU', '100000.00', 'capture', '2025-04-16 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(763, 64, 'ipsum ducimus optio', 'INV-435IX', '100000.00', 'capture', '2025-02-26 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(764, 64, 'et ipsam dignissimos', 'INV-972OZ', '100000.00', 'capture', '2024-12-31 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(765, 64, 'sit dicta facere', 'INV-181IZ', '100000.00', 'capture', '2024-12-23 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(766, 64, 'natus ipsa velit', 'INV-958BD', '100000.00', 'capture', '2025-01-28 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(767, 64, 'aliquid sit quas', 'INV-352BY', '100000.00', 'capture', '2024-12-22 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(768, 64, 'laudantium alias officiis', 'INV-364DF', '100000.00', 'capture', '2024-12-20 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(769, 65, 'excepturi eius minus', 'INV-543ZS', '100000.00', 'capture', '2025-06-12 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(770, 65, 'cum nihil quod', 'INV-939VS', '100000.00', 'capture', '2025-01-06 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(771, 65, 'repudiandae illum dolores', 'INV-687LV', '100000.00', 'capture', '2025-05-11 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(772, 65, 'vel aut doloremque', 'INV-089RU', '100000.00', 'capture', '2025-04-29 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(773, 65, 'sunt minus id', 'INV-502JJ', '100000.00', 'capture', '2025-02-27 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(774, 65, 'molestiae ratione facilis', 'INV-893WL', '100000.00', 'capture', '2025-05-02 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(775, 65, 'illum tempore similique', 'INV-887AS', '100000.00', 'capture', '2025-02-11 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(776, 65, 'facere consequatur quis', 'INV-890JE', '100000.00', 'capture', '2025-03-13 00:00:00', '2025-06-14 17:04:15', '2025-06-14 17:04:15'),
(777, 65, 'quasi sit nam', 'INV-791ET', '100000.00', 'capture', '2025-05-27 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(778, 65, 'rerum eligendi ipsam', 'INV-351RR', '100000.00', 'capture', '2025-03-08 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(779, 65, 'repellendus dolor laudantium', 'INV-237LJ', '100000.00', 'capture', '2025-03-16 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(780, 65, 'ut asperiores quaerat', 'INV-041ZH', '100000.00', 'capture', '2025-05-05 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(781, 66, 'fugiat at repudiandae', 'INV-902GO', '100000.00', 'capture', '2025-05-28 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(782, 66, 'deleniti qui explicabo', 'INV-408FY', '100000.00', 'capture', '2025-02-08 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(783, 66, 'laudantium rem ducimus', 'INV-501EU', '100000.00', 'capture', '2025-02-05 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(784, 66, 'quibusdam expedita qui', 'INV-810WY', '100000.00', 'capture', '2025-05-05 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(785, 66, 'nisi possimus distinctio', 'INV-913DL', '100000.00', 'capture', '2025-01-03 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(786, 66, 'voluptas repudiandae aut', 'INV-443RB', '100000.00', 'capture', '2025-05-28 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(787, 66, 'autem amet perspiciatis', 'INV-462AL', '100000.00', 'capture', '2025-03-10 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(788, 66, 'est molestiae et', 'INV-176QG', '100000.00', 'capture', '2025-06-09 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(789, 66, 'fugiat officiis sint', 'INV-006PM', '100000.00', 'capture', '2025-01-18 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(790, 66, 'maiores totam distinctio', 'INV-328CN', '100000.00', 'capture', '2025-03-09 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(791, 66, 'molestias consequatur et', 'INV-477NW', '100000.00', 'capture', '2025-03-01 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(792, 66, 'expedita qui aliquam', 'INV-808DR', '100000.00', 'capture', '2025-02-09 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(793, 67, 'est esse autem', 'INV-375RD', '100000.00', 'capture', '2025-01-26 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(794, 67, 'sapiente quasi nostrum', 'INV-554JY', '100000.00', 'capture', '2025-03-13 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(795, 67, 'nisi aperiam optio', 'INV-354SV', '100000.00', 'capture', '2025-02-28 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(796, 67, 'aut eveniet et', 'INV-384YP', '100000.00', 'capture', '2024-12-22 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(797, 67, 'corporis sint eos', 'INV-500SD', '100000.00', 'capture', '2025-04-29 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(798, 67, 'nesciunt consequatur totam', 'INV-044UK', '100000.00', 'capture', '2025-03-07 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(799, 67, 'voluptas laboriosam architecto', 'INV-859JQ', '100000.00', 'capture', '2025-01-02 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(800, 67, 'numquam repellendus hic', 'INV-369LQ', '100000.00', 'capture', '2025-06-08 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(801, 67, 'facilis aut ut', 'INV-662VG', '100000.00', 'capture', '2025-04-30 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(802, 67, 'deserunt dignissimos eius', 'INV-993TF', '100000.00', 'capture', '2025-01-24 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(803, 67, 'dolorum recusandae sint', 'INV-708RK', '100000.00', 'capture', '2025-02-15 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(804, 67, 'aut deserunt ex', 'INV-817TD', '100000.00', 'capture', '2025-05-13 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(805, 68, 'ex impedit quis', 'INV-443RN', '100000.00', 'capture', '2025-05-10 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(806, 68, 'adipisci minima maiores', 'INV-758KM', '100000.00', 'capture', '2025-01-23 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(807, 68, 'doloremque ullam quibusdam', 'INV-890XK', '100000.00', 'capture', '2025-06-12 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(808, 68, 'ut sit natus', 'INV-055UL', '100000.00', 'capture', '2025-04-03 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(809, 68, 'rem doloribus ullam', 'INV-952TF', '100000.00', 'capture', '2024-12-22 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(810, 68, 'iste laborum ut', 'INV-820WC', '100000.00', 'capture', '2025-05-13 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(811, 68, 'laudantium facilis ut', 'INV-187VK', '100000.00', 'capture', '2025-04-18 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(812, 68, 'ut aut non', 'INV-067FO', '100000.00', 'capture', '2025-02-24 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(813, 68, 'possimus autem quo', 'INV-059TI', '100000.00', 'capture', '2025-03-10 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(814, 68, 'enim sint necessitatibus', 'INV-854YS', '100000.00', 'capture', '2025-03-13 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(815, 68, 'itaque vero sapiente', 'INV-443NN', '100000.00', 'capture', '2025-02-24 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(816, 68, 'deserunt eos veniam', 'INV-045UH', '100000.00', 'capture', '2025-04-16 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(817, 69, 'sit amet et', 'INV-114CH', '100000.00', 'capture', '2025-03-13 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(818, 69, 'illum ut aut', 'INV-373QU', '100000.00', 'capture', '2025-02-21 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(819, 69, 'nihil corporis quis', 'INV-405HJ', '100000.00', 'capture', '2025-05-17 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(820, 69, 'nulla fuga quo', 'INV-493QM', '100000.00', 'capture', '2025-05-16 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(821, 69, 'asperiores vel et', 'INV-268JI', '100000.00', 'capture', '2025-04-09 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(822, 69, 'et quod nam', 'INV-264RW', '100000.00', 'capture', '2025-06-12 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(823, 69, 'alias ut deserunt', 'INV-436VP', '100000.00', 'capture', '2025-02-01 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(824, 69, 'dolore temporibus impedit', 'INV-589PM', '100000.00', 'capture', '2024-12-15 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(825, 69, 'iure ea sit', 'INV-400OS', '100000.00', 'capture', '2025-02-25 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(826, 69, 'qui nemo facere', 'INV-723HV', '100000.00', 'capture', '2025-01-03 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(827, 69, 'magni aut voluptas', 'INV-823MB', '100000.00', 'capture', '2025-05-25 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(828, 69, 'aspernatur aut sed', 'INV-261AI', '100000.00', 'capture', '2025-04-23 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(829, 70, 'ullam ex hic', 'INV-248DR', '100000.00', 'capture', '2025-01-02 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(830, 70, 'libero maiores dicta', 'INV-172GJ', '100000.00', 'capture', '2025-04-08 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(831, 70, 'quibusdam nam dolor', 'INV-459SA', '100000.00', 'capture', '2025-05-26 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(832, 70, 'dolores pariatur minima', 'INV-607KB', '100000.00', 'capture', '2025-04-29 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(833, 70, 'dignissimos distinctio quisquam', 'INV-657ZG', '100000.00', 'capture', '2025-05-04 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(834, 70, 'sed qui quas', 'INV-930SA', '100000.00', 'capture', '2025-02-19 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(835, 70, 'perferendis porro vel', 'INV-544JT', '100000.00', 'capture', '2025-02-22 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(836, 70, 'voluptatem veritatis eum', 'INV-098JY', '100000.00', 'capture', '2025-03-16 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(837, 70, 'necessitatibus accusantium facere', 'INV-085YI', '100000.00', 'capture', '2024-12-30 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(838, 70, 'possimus est est', 'INV-525CF', '100000.00', 'capture', '2025-04-08 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(839, 70, 'a dolores impedit', 'INV-063YD', '100000.00', 'capture', '2025-01-13 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(840, 70, 'enim dolor voluptas', 'INV-506SP', '100000.00', 'capture', '2025-01-19 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(841, 71, 'vero repudiandae ratione', 'INV-085SH', '100000.00', 'capture', '2025-05-23 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(842, 71, 'odio veniam quasi', 'INV-623PL', '100000.00', 'capture', '2024-12-20 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(843, 71, 'voluptas officia magnam', 'INV-199GF', '100000.00', 'capture', '2025-05-26 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(844, 71, 'ab quia omnis', 'INV-432NY', '100000.00', 'capture', '2025-05-01 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(845, 71, 'sed nam non', 'INV-238EV', '100000.00', 'capture', '2025-04-27 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(846, 71, 'magni animi natus', 'INV-502QB', '100000.00', 'capture', '2025-02-13 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(847, 71, 'et ex alias', 'INV-172CN', '100000.00', 'capture', '2025-01-19 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(848, 71, 'quasi rerum ad', 'INV-681ED', '100000.00', 'capture', '2025-03-14 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(849, 71, 'iste fugit eius', 'INV-746XD', '100000.00', 'capture', '2025-04-05 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(850, 71, 'et dolores exercitationem', 'INV-004YC', '100000.00', 'capture', '2025-02-26 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(851, 71, 'vel sequi libero', 'INV-757SD', '100000.00', 'capture', '2025-04-04 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(852, 71, 'ut quam tempora', 'INV-638VX', '100000.00', 'capture', '2025-02-03 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(853, 72, 'aperiam numquam et', 'INV-920QM', '100000.00', 'capture', '2025-02-08 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(854, 72, 'et voluptatem quia', 'INV-786TD', '100000.00', 'capture', '2025-05-20 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(855, 72, 'et magnam sit', 'INV-304XA', '100000.00', 'capture', '2025-05-08 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(856, 72, 'asperiores aliquid omnis', 'INV-901IQ', '100000.00', 'capture', '2025-02-26 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(857, 72, 'temporibus quidem voluptatem', 'INV-634YL', '100000.00', 'capture', '2025-05-29 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(858, 72, 'magnam voluptatem quod', 'INV-575ZX', '100000.00', 'capture', '2025-06-13 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(859, 72, 'qui et doloremque', 'INV-295TI', '100000.00', 'capture', '2025-02-08 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(860, 72, 'ipsum voluptatem enim', 'INV-706LP', '100000.00', 'capture', '2025-06-06 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(861, 72, 'sint voluptatibus cupiditate', 'INV-470BR', '100000.00', 'capture', '2025-02-06 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(862, 72, 'velit saepe qui', 'INV-754BW', '100000.00', 'capture', '2025-02-09 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(863, 72, 'nesciunt dignissimos necessitatibus', 'INV-489AS', '100000.00', 'capture', '2025-05-07 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(864, 72, 'ea omnis iusto', 'INV-911CB', '100000.00', 'capture', '2025-01-07 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(865, 73, 'quia unde tenetur', 'INV-162KX', '100000.00', 'capture', '2025-03-14 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(866, 73, 'at ducimus facere', 'INV-230KG', '100000.00', 'capture', '2025-03-10 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(867, 73, 'doloribus debitis voluptatem', 'INV-337KJ', '100000.00', 'capture', '2025-04-03 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(868, 73, 'at qui ab', 'INV-200GK', '100000.00', 'capture', '2025-02-23 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(869, 73, 'ea voluptate amet', 'INV-065EF', '100000.00', 'capture', '2025-02-22 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(870, 73, 'sit consequatur officia', 'INV-557RZ', '100000.00', 'capture', '2025-01-06 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(871, 73, 'cupiditate corrupti et', 'INV-054RJ', '100000.00', 'capture', '2025-03-04 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(872, 73, 'vel qui unde', 'INV-004XI', '100000.00', 'capture', '2025-02-24 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(873, 73, 'eum ipsum eligendi', 'INV-122CT', '100000.00', 'capture', '2025-05-01 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(874, 73, 'magnam non expedita', 'INV-772UF', '100000.00', 'capture', '2025-01-02 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(875, 73, 'nihil corporis aliquid', 'INV-325UI', '100000.00', 'capture', '2025-05-15 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(876, 73, 'dignissimos voluptas atque', 'INV-531JQ', '100000.00', 'capture', '2025-04-12 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(877, 74, 'distinctio ipsa cum', 'INV-489FH', '100000.00', 'capture', '2025-05-10 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(878, 74, 'alias ut voluptatem', 'INV-738EP', '100000.00', 'capture', '2025-01-25 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(879, 74, 'accusantium quibusdam tenetur', 'INV-977RB', '100000.00', 'capture', '2025-01-25 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(880, 74, 'quia aliquid alias', 'INV-497HS', '100000.00', 'capture', '2025-03-27 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(881, 74, 'ducimus eaque consequatur', 'INV-488DN', '100000.00', 'capture', '2024-12-16 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(882, 74, 'consequatur et consequatur', 'INV-195CM', '100000.00', 'capture', '2025-02-06 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(883, 74, 'ullam explicabo tempore', 'INV-479XW', '100000.00', 'capture', '2025-03-26 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(884, 74, 'et et sunt', 'INV-447GP', '100000.00', 'capture', '2025-04-07 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(885, 74, 'officiis non ut', 'INV-903HQ', '100000.00', 'capture', '2025-05-08 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(886, 74, 'ipsum architecto dolor', 'INV-021XL', '100000.00', 'capture', '2025-02-22 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(887, 74, 'ab non porro', 'INV-712VQ', '100000.00', 'capture', '2025-06-05 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(888, 74, 'ipsam est culpa', 'INV-914OX', '100000.00', 'capture', '2025-06-10 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(889, 75, 'et ut voluptas', 'INV-983EX', '100000.00', 'capture', '2025-05-26 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(890, 75, 'totam et est', 'INV-437IR', '100000.00', 'capture', '2025-02-21 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(891, 75, 'ut est quis', 'INV-370UE', '100000.00', 'capture', '2025-02-16 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(892, 75, 'molestiae aperiam minus', 'INV-021TP', '100000.00', 'capture', '2025-04-10 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(893, 75, 'eaque nemo hic', 'INV-458NP', '100000.00', 'capture', '2025-06-12 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(894, 75, 'tempora quibusdam at', 'INV-073PY', '100000.00', 'capture', '2025-03-25 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(895, 75, 'non tempore minima', 'INV-059IW', '100000.00', 'capture', '2025-05-06 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(896, 75, 'voluptatem doloribus et', 'INV-854AR', '100000.00', 'capture', '2024-12-24 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(897, 75, 'praesentium quod quod', 'INV-550FZ', '100000.00', 'capture', '2025-01-19 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(898, 75, 'facere voluptatibus nihil', 'INV-392SE', '100000.00', 'capture', '2025-05-08 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(899, 75, 'nostrum nesciunt dignissimos', 'INV-359TP', '100000.00', 'capture', '2025-06-01 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(900, 75, 'eum est eum', 'INV-141DG', '100000.00', 'capture', '2024-12-18 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(901, 76, 'et voluptas hic', 'INV-066MT', '100000.00', 'capture', '2025-03-11 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(902, 76, 'a et quae', 'INV-684SJ', '100000.00', 'capture', '2024-12-19 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(903, 76, 'explicabo id eum', 'INV-568KE', '100000.00', 'capture', '2025-03-29 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(904, 76, 'ad debitis voluptas', 'INV-625JZ', '100000.00', 'capture', '2024-12-18 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(905, 76, 'debitis aut explicabo', 'INV-763BB', '100000.00', 'capture', '2025-03-29 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(906, 76, 'sequi et velit', 'INV-796NN', '100000.00', 'capture', '2025-01-17 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(907, 76, 'ea quos labore', 'INV-776OU', '100000.00', 'capture', '2025-04-28 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(908, 76, 'in pariatur rerum', 'INV-996GN', '100000.00', 'capture', '2025-02-14 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(909, 76, 'velit aperiam unde', 'INV-027HP', '100000.00', 'capture', '2025-03-07 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(910, 76, 'similique saepe autem', 'INV-091ZU', '100000.00', 'capture', '2025-04-10 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(911, 76, 'perspiciatis neque ad', 'INV-313SE', '100000.00', 'capture', '2025-05-29 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(912, 76, 'quis odio placeat', 'INV-512XG', '100000.00', 'capture', '2024-12-27 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(913, 77, 'blanditiis adipisci non', 'INV-699KO', '100000.00', 'capture', '2025-05-22 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(914, 77, 'eos labore libero', 'INV-647YW', '100000.00', 'capture', '2025-06-03 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(915, 77, 'sint et qui', 'INV-603GV', '100000.00', 'capture', '2025-05-16 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(916, 77, 'ex ex corporis', 'INV-275RP', '100000.00', 'capture', '2025-02-23 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(917, 77, 'quos sapiente occaecati', 'INV-089XF', '100000.00', 'capture', '2025-01-03 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(918, 77, 'doloribus id nihil', 'INV-592GU', '100000.00', 'capture', '2025-03-25 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(919, 77, 'dolorum sunt deserunt', 'INV-012PQ', '100000.00', 'capture', '2025-01-31 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(920, 77, 'magnam odit ipsum', 'INV-813QD', '100000.00', 'capture', '2025-05-19 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(921, 77, 'vel est recusandae', 'INV-591PB', '100000.00', 'capture', '2025-04-13 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(922, 77, 'dolor tenetur non', 'INV-842CY', '100000.00', 'capture', '2025-01-11 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(923, 77, 'exercitationem reprehenderit magni', 'INV-473XB', '100000.00', 'capture', '2025-03-05 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(924, 77, 'maiores maiores voluptatem', 'INV-311RO', '100000.00', 'capture', '2025-01-02 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(925, 78, 'sunt omnis sed', 'INV-499BS', '100000.00', 'capture', '2025-03-25 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(926, 78, 'velit sit et', 'INV-698MF', '100000.00', 'capture', '2025-05-17 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(927, 78, 'similique placeat tempore', 'INV-767AU', '100000.00', 'capture', '2025-04-04 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(928, 78, 'quis facere tempora', 'INV-154MD', '100000.00', 'capture', '2025-02-02 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(929, 78, 'vero soluta accusantium', 'INV-199UG', '100000.00', 'capture', '2025-02-26 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(930, 78, 'quibusdam cum veritatis', 'INV-877EE', '100000.00', 'capture', '2025-06-06 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(931, 78, 'accusantium sit atque', 'INV-901VR', '100000.00', 'capture', '2025-04-13 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(932, 78, 'voluptas quia molestias', 'INV-299YR', '100000.00', 'capture', '2024-12-15 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(933, 78, 'vitae veniam voluptatem', 'INV-932YO', '100000.00', 'capture', '2025-04-19 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(934, 78, 'nam aut fuga', 'INV-607SP', '100000.00', 'capture', '2025-01-20 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(935, 78, 'similique molestiae aut', 'INV-144QR', '100000.00', 'capture', '2025-04-24 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(936, 78, 'reprehenderit earum ratione', 'INV-345YF', '100000.00', 'capture', '2025-05-28 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(937, 79, 'numquam fugiat deleniti', 'INV-753RF', '100000.00', 'capture', '2025-06-04 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(938, 79, 'non at rerum', 'INV-843JT', '100000.00', 'capture', '2025-03-29 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(939, 79, 'dolores et rerum', 'INV-733AT', '100000.00', 'capture', '2025-02-03 00:00:00', '2025-06-14 17:04:16', '2025-06-14 17:04:16'),
(940, 79, 'aut eum magnam', 'INV-554WV', '100000.00', 'capture', '2025-01-21 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(941, 79, 'labore voluptas dolores', 'INV-678IM', '100000.00', 'capture', '2025-02-25 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(942, 79, 'placeat officia animi', 'INV-006KS', '100000.00', 'capture', '2025-06-07 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(943, 79, 'consequatur omnis voluptas', 'INV-575HE', '100000.00', 'capture', '2025-01-04 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(944, 79, 'explicabo earum molestiae', 'INV-609SA', '100000.00', 'capture', '2025-05-17 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(945, 79, 'in deleniti autem', 'INV-140AT', '100000.00', 'capture', '2025-06-09 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(946, 79, 'aspernatur est provident', 'INV-535SK', '100000.00', 'capture', '2025-03-10 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(947, 79, 'ut ut temporibus', 'INV-533YF', '100000.00', 'capture', '2025-02-03 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(948, 79, 'iusto aliquid aut', 'INV-897WP', '100000.00', 'capture', '2025-02-27 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(949, 80, 'accusantium fugit laudantium', 'INV-793CW', '100000.00', 'capture', '2024-12-28 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(950, 80, 'quidem dolores ipsum', 'INV-435TJ', '100000.00', 'capture', '2025-02-20 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(951, 80, 'soluta consequuntur eius', 'INV-613DN', '100000.00', 'capture', '2025-06-10 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(952, 80, 'delectus adipisci dolore', 'INV-157OF', '100000.00', 'capture', '2024-12-17 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(953, 80, 'tenetur ea dolorum', 'INV-167CH', '100000.00', 'capture', '2024-12-29 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(954, 80, 'iure fugit aperiam', 'INV-855EQ', '100000.00', 'capture', '2025-06-14 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(955, 80, 'asperiores error enim', 'INV-253UR', '100000.00', 'capture', '2025-04-29 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(956, 80, 'enim voluptatibus accusamus', 'INV-118CE', '100000.00', 'capture', '2025-01-06 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(957, 80, 'quis qui id', 'INV-408BN', '100000.00', 'capture', '2025-05-18 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(958, 80, 'sunt rerum esse', 'INV-271CW', '100000.00', 'capture', '2025-03-13 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(959, 80, 'enim praesentium minus', 'INV-395FT', '100000.00', 'capture', '2024-12-29 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(960, 80, 'eos dicta sunt', 'INV-592BI', '100000.00', 'capture', '2025-03-15 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(961, 81, 'rerum a repellat', 'INV-583FZ', '100000.00', 'capture', '2025-06-10 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(962, 81, 'voluptatibus esse velit', 'INV-058DU', '100000.00', 'capture', '2025-03-07 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(963, 81, 'suscipit dolorem adipisci', 'INV-591ZQ', '100000.00', 'capture', '2025-01-02 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(964, 81, 'voluptates rerum odio', 'INV-469ZL', '100000.00', 'capture', '2025-01-15 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(965, 81, 'veritatis amet odio', 'INV-667LY', '100000.00', 'capture', '2025-04-12 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(966, 81, 'qui ea consequatur', 'INV-006YA', '100000.00', 'capture', '2025-01-22 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(967, 81, 'alias ratione aliquam', 'INV-687OA', '100000.00', 'capture', '2025-05-23 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(968, 81, 'illum accusantium voluptatem', 'INV-057UW', '100000.00', 'capture', '2024-12-28 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(969, 81, 'dolorem officiis molestias', 'INV-601FN', '100000.00', 'capture', '2025-06-13 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(970, 81, 'iure tenetur soluta', 'INV-595NI', '100000.00', 'capture', '2025-03-22 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(971, 81, 'iste qui voluptate', 'INV-572VN', '100000.00', 'capture', '2025-02-20 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(972, 81, 'ab corrupti ex', 'INV-112RF', '100000.00', 'capture', '2025-03-16 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(973, 82, 'reprehenderit sequi ut', 'INV-546NF', '100000.00', 'capture', '2025-04-20 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(974, 82, 'distinctio et nobis', 'INV-729FD', '100000.00', 'capture', '2024-12-19 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(975, 82, 'tenetur velit quibusdam', 'INV-659NQ', '100000.00', 'capture', '2025-05-09 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(976, 82, 'vel consequatur officia', 'INV-958KD', '100000.00', 'capture', '2025-04-13 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(977, 82, 'perspiciatis voluptatem corrupti', 'INV-712BO', '100000.00', 'capture', '2025-02-22 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(978, 82, 'magni maiores quidem', 'INV-208RN', '100000.00', 'capture', '2025-03-22 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(979, 82, 'architecto inventore aut', 'INV-696ZR', '100000.00', 'capture', '2025-04-13 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(980, 82, 'et harum libero', 'INV-066XS', '100000.00', 'capture', '2025-01-15 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(981, 82, 'quia veniam minus', 'INV-744EQ', '100000.00', 'capture', '2025-04-07 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(982, 82, 'ipsum non eligendi', 'INV-773UN', '100000.00', 'capture', '2025-05-07 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(983, 82, 'vitae nihil quo', 'INV-746BD', '100000.00', 'capture', '2025-05-20 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(984, 82, 'cum ut vel', 'INV-525ZW', '100000.00', 'capture', '2025-04-07 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(985, 83, 'sequi ut omnis', 'INV-466JZ', '100000.00', 'capture', '2025-03-15 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(986, 83, 'dolorem dolore amet', 'INV-438YN', '100000.00', 'capture', '2025-04-08 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(987, 83, 'ipsum quis sunt', 'INV-366KY', '100000.00', 'capture', '2025-02-25 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(988, 83, 'eum explicabo veniam', 'INV-580CO', '100000.00', 'capture', '2025-02-25 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(989, 83, 'nostrum sapiente in', 'INV-627TK', '100000.00', 'capture', '2025-02-27 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(990, 83, 'eos quos consequatur', 'INV-518MS', '100000.00', 'capture', '2024-12-27 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(991, 83, 'atque facilis voluptates', 'INV-246WI', '100000.00', 'capture', '2025-04-17 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(992, 83, 'labore vitae error', 'INV-159TI', '100000.00', 'capture', '2025-04-28 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(993, 83, 'aut atque porro', 'INV-192HI', '100000.00', 'capture', '2024-12-16 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(994, 83, 'eos dicta dignissimos', 'INV-007JB', '100000.00', 'capture', '2025-02-11 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(995, 83, 'omnis dolorem a', 'INV-018PN', '100000.00', 'capture', '2025-05-23 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(996, 83, 'beatae magni maxime', 'INV-986EI', '100000.00', 'capture', '2025-05-21 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(997, 84, 'asperiores exercitationem maxime', 'INV-357QK', '100000.00', 'capture', '2025-03-07 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(998, 84, 'amet et laboriosam', 'INV-329UV', '100000.00', 'capture', '2025-01-07 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(999, 84, 'ab vel est', 'INV-694EL', '100000.00', 'capture', '2025-02-13 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1000, 84, 'eligendi itaque labore', 'INV-435GA', '100000.00', 'capture', '2024-12-29 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1001, 84, 'similique maiores quam', 'INV-712TU', '100000.00', 'capture', '2025-02-26 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1002, 84, 'quia velit est', 'INV-714AC', '100000.00', 'capture', '2025-01-07 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1003, 84, 'libero dolores omnis', 'INV-363KW', '100000.00', 'capture', '2025-05-04 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1004, 84, 'omnis molestiae ad', 'INV-685QQ', '100000.00', 'capture', '2025-02-17 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1005, 84, 'deserunt eaque omnis', 'INV-499GT', '100000.00', 'capture', '2025-03-22 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1006, 84, 'non iusto velit', 'INV-719XQ', '100000.00', 'capture', '2025-03-13 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1007, 84, 'molestiae voluptate doloribus', 'INV-839TW', '100000.00', 'capture', '2025-01-27 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1008, 84, 'quia tempora quos', 'INV-375BP', '100000.00', 'capture', '2025-05-04 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1009, 85, 'deleniti est reprehenderit', 'INV-234HO', '100000.00', 'capture', '2025-04-01 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1010, 85, 'quam minima voluptatum', 'INV-318ZG', '100000.00', 'capture', '2025-02-18 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1011, 85, 'explicabo tempora facere', 'INV-584SO', '100000.00', 'capture', '2025-03-25 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1012, 85, 'dolorem provident inventore', 'INV-437UD', '100000.00', 'capture', '2025-06-11 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1013, 85, 'maxime aut doloremque', 'INV-549ET', '100000.00', 'capture', '2025-03-07 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1014, 85, 'sit quas expedita', 'INV-497BH', '100000.00', 'capture', '2025-02-13 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1015, 85, 'ut saepe voluptatem', 'INV-028IZ', '100000.00', 'capture', '2025-05-25 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1016, 85, 'quasi quia et', 'INV-922FN', '100000.00', 'capture', '2024-12-16 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1017, 85, 'fuga nostrum iusto', 'INV-927VC', '100000.00', 'capture', '2025-03-26 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1018, 85, 'et perspiciatis ipsum', 'INV-169OI', '100000.00', 'capture', '2025-03-12 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1019, 85, 'non et nobis', 'INV-658MK', '100000.00', 'capture', '2025-05-15 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1020, 85, 'atque consequatur recusandae', 'INV-565ZC', '100000.00', 'capture', '2025-02-27 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1021, 86, 'praesentium doloribus mollitia', 'INV-045IO', '100000.00', 'capture', '2025-01-20 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1022, 86, 'ducimus ut eveniet', 'INV-503TY', '100000.00', 'capture', '2025-02-01 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1023, 86, 'consequatur cupiditate qui', 'INV-740WZ', '100000.00', 'capture', '2025-02-20 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1024, 86, 'cumque sequi excepturi', 'INV-118FT', '100000.00', 'capture', '2025-02-03 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1025, 86, 'aut repellendus temporibus', 'INV-478ZT', '100000.00', 'capture', '2025-02-25 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1026, 86, 'voluptates dolorem voluptates', 'INV-597PF', '100000.00', 'capture', '2025-05-13 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1027, 86, 'officia consequuntur perspiciatis', 'INV-186AG', '100000.00', 'capture', '2025-03-24 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1028, 86, 'consequatur natus ut', 'INV-409KE', '100000.00', 'capture', '2025-05-25 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1029, 86, 'maiores vero esse', 'INV-533KO', '100000.00', 'capture', '2025-01-29 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1030, 86, 'aut voluptas excepturi', 'INV-685XK', '100000.00', 'capture', '2025-03-15 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1031, 86, 'accusantium laborum laboriosam', 'INV-775YU', '100000.00', 'capture', '2025-04-14 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1032, 86, 'perspiciatis neque ea', 'INV-131JC', '100000.00', 'capture', '2025-04-16 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1033, 87, 'voluptatem voluptates voluptate', 'INV-648RK', '100000.00', 'capture', '2025-05-05 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1034, 87, 'sed rem ipsa', 'INV-687PO', '100000.00', 'capture', '2025-03-24 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1035, 87, 'dicta distinctio dignissimos', 'INV-273MH', '100000.00', 'capture', '2025-01-27 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1036, 87, 'est ut laboriosam', 'INV-842ET', '100000.00', 'capture', '2025-01-16 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1037, 87, 'nam vero enim', 'INV-468AN', '100000.00', 'capture', '2025-04-27 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1038, 87, 'magnam corrupti corporis', 'INV-230BQ', '100000.00', 'capture', '2024-12-28 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1039, 87, 'fugiat repellat molestiae', 'INV-556MT', '100000.00', 'capture', '2025-04-09 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1040, 87, 'amet molestiae adipisci', 'INV-395HD', '100000.00', 'capture', '2025-02-27 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1041, 87, 'quasi ea perspiciatis', 'INV-125ZQ', '100000.00', 'capture', '2025-05-11 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1042, 87, 'aspernatur odit et', 'INV-471MJ', '100000.00', 'capture', '2024-12-21 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1043, 87, 'facilis tempore sed', 'INV-199YR', '100000.00', 'capture', '2025-03-19 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1044, 87, 'dolores id tenetur', 'INV-591TB', '100000.00', 'capture', '2025-03-16 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1045, 88, 'eligendi illo corrupti', 'INV-022CR', '100000.00', 'capture', '2025-03-03 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1046, 88, 'asperiores saepe aut', 'INV-424KD', '100000.00', 'capture', '2025-04-25 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1047, 88, 'et id aliquid', 'INV-472KC', '100000.00', 'capture', '2024-12-26 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1048, 88, 'reiciendis voluptatem beatae', 'INV-430BX', '100000.00', 'capture', '2025-03-22 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1049, 88, 'aliquid enim mollitia', 'INV-594GO', '100000.00', 'capture', '2025-03-07 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1050, 88, 'ex mollitia unde', 'INV-546DM', '100000.00', 'capture', '2025-05-18 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1051, 88, 'atque omnis et', 'INV-233ZI', '100000.00', 'capture', '2025-02-02 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1052, 88, 'enim minima dicta', 'INV-218UQ', '100000.00', 'capture', '2025-01-13 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1053, 88, 'est iste voluptas', 'INV-370AE', '100000.00', 'capture', '2025-02-16 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1054, 88, 'non quia quas', 'INV-543BM', '100000.00', 'capture', '2025-05-25 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1055, 88, 'praesentium ex molestiae', 'INV-345XZ', '100000.00', 'capture', '2025-02-16 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1056, 88, 'in delectus doloribus', 'INV-534CC', '100000.00', 'capture', '2025-03-23 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1057, 89, 'qui quasi labore', 'INV-951UJ', '100000.00', 'capture', '2025-03-01 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1058, 89, 'non corrupti hic', 'INV-646RW', '100000.00', 'capture', '2025-03-12 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1059, 89, 'est magni distinctio', 'INV-982NN', '100000.00', 'capture', '2025-05-16 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1060, 89, 'officiis reprehenderit nesciunt', 'INV-454KX', '100000.00', 'capture', '2025-05-03 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1061, 89, 'totam modi praesentium', 'INV-375ME', '100000.00', 'capture', '2025-01-29 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1062, 89, 'in rerum voluptate', 'INV-185BJ', '100000.00', 'capture', '2025-01-17 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1063, 89, 'ut ipsum eligendi', 'INV-973BM', '100000.00', 'capture', '2025-01-26 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1064, 89, 'vel velit ea', 'INV-497LX', '100000.00', 'capture', '2025-01-22 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1065, 89, 'quo minima et', 'INV-899MI', '100000.00', 'capture', '2025-05-16 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1066, 89, 'molestias commodi voluptates', 'INV-627XN', '100000.00', 'capture', '2025-04-21 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1067, 89, 'deserunt id alias', 'INV-242PS', '100000.00', 'capture', '2025-04-04 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1068, 89, 'mollitia omnis ullam', 'INV-231YZ', '100000.00', 'capture', '2025-01-07 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1069, 90, 'nihil provident tenetur', 'INV-274JZ', '100000.00', 'capture', '2025-04-09 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1070, 90, 'fuga quis similique', 'INV-928ZQ', '100000.00', 'capture', '2025-01-05 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1071, 90, 'repellendus sunt deserunt', 'INV-755TK', '100000.00', 'capture', '2025-03-15 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1072, 90, 'ad tenetur eveniet', 'INV-656TP', '100000.00', 'capture', '2025-05-09 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1073, 90, 'nostrum culpa animi', 'INV-077QE', '100000.00', 'capture', '2025-02-03 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1074, 90, 'tempora non quae', 'INV-357OF', '100000.00', 'capture', '2025-05-21 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1075, 90, 'reiciendis ullam labore', 'INV-115FF', '100000.00', 'capture', '2025-03-26 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1076, 90, 'id vitae saepe', 'INV-072LC', '100000.00', 'capture', '2024-12-27 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1077, 90, 'itaque inventore reiciendis', 'INV-078UP', '100000.00', 'capture', '2025-04-20 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1078, 90, 'harum qui et', 'INV-405QY', '100000.00', 'capture', '2025-05-21 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1079, 90, 'doloribus enim nam', 'INV-198UA', '100000.00', 'capture', '2025-04-22 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1080, 90, 'laborum quos unde', 'INV-048CU', '100000.00', 'capture', '2025-05-29 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17');
INSERT INTO `tagihans` (`id`, `user_id`, `nama_tagihan`, `kode_tagihan`, `nominal`, `status`, `tanggal`, `created_at`, `updated_at`) VALUES
(1081, 91, 'tempora magnam temporibus', 'INV-227UO', '100000.00', 'capture', '2024-12-17 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1082, 91, 'libero a odit', 'INV-212ZU', '100000.00', 'capture', '2025-02-07 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1083, 91, 'hic consequatur magni', 'INV-083MO', '100000.00', 'capture', '2025-05-09 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1084, 91, 'dolor aut accusantium', 'INV-410HI', '100000.00', 'capture', '2025-06-11 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1085, 91, 'et sed temporibus', 'INV-064DP', '100000.00', 'capture', '2025-01-09 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1086, 91, 'natus consequatur nobis', 'INV-795KL', '100000.00', 'capture', '2025-05-07 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1087, 91, 'dolorem eos nisi', 'INV-742GL', '100000.00', 'capture', '2025-05-28 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1088, 91, 'voluptatibus dolores nam', 'INV-881VF', '100000.00', 'capture', '2025-05-31 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1089, 91, 'est architecto alias', 'INV-753CF', '100000.00', 'capture', '2025-05-19 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1090, 91, 'dolorem commodi rerum', 'INV-079UU', '100000.00', 'capture', '2025-03-26 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1091, 91, 'excepturi libero est', 'INV-010YM', '100000.00', 'capture', '2025-05-02 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1092, 91, 'sunt ut id', 'INV-300UB', '100000.00', 'capture', '2025-06-04 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1093, 92, 'et sint consequatur', 'INV-128ZO', '100000.00', 'capture', '2025-04-30 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1094, 92, 'quae et voluptatum', 'INV-673KM', '100000.00', 'capture', '2025-06-12 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1095, 92, 'delectus porro a', 'INV-940ES', '100000.00', 'capture', '2025-02-27 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1096, 92, 'cum dolores omnis', 'INV-158MF', '100000.00', 'capture', '2025-05-24 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1097, 92, 'reiciendis tempora sunt', 'INV-422MP', '100000.00', 'capture', '2025-06-05 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1098, 92, 'libero ex eligendi', 'INV-652CK', '100000.00', 'capture', '2025-03-08 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1099, 92, 'dolor qui omnis', 'INV-394SM', '100000.00', 'capture', '2025-01-28 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1100, 92, 'voluptatibus delectus beatae', 'INV-325TF', '100000.00', 'capture', '2025-06-14 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1101, 92, 'quibusdam nihil iste', 'INV-097KK', '100000.00', 'capture', '2025-03-08 00:00:00', '2025-06-14 17:04:17', '2025-06-14 17:04:17'),
(1102, 92, 'adipisci occaecati quia', 'INV-525IV', '100000.00', 'capture', '2025-01-24 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1103, 92, 'et omnis rerum', 'INV-686IZ', '100000.00', 'capture', '2025-04-03 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1104, 92, 'voluptas illum iure', 'INV-574XK', '100000.00', 'capture', '2025-01-22 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1105, 93, 'veritatis vero cum', 'INV-838TH', '100000.00', 'settlement', '2025-04-18 00:00:00', '2025-06-14 17:04:18', '2025-06-16 10:21:23'),
(1106, 93, 'consectetur qui est', 'INV-957FN', '100000.00', 'capture', '2025-03-10 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1107, 93, 'culpa nobis magnam', 'INV-854DV', '100000.00', 'capture', '2025-05-27 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1108, 93, 'fugiat perspiciatis inventore', 'INV-821IL', '100000.00', 'capture', '2025-02-07 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1109, 93, 'dolore voluptatem autem', 'INV-079MB', '100000.00', 'capture', '2025-03-23 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1110, 93, 'commodi quis atque', 'INV-713BX', '100000.00', 'capture', '2025-05-25 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1111, 93, 'aut deleniti voluptate', 'INV-992QR', '100000.00', 'capture', '2025-02-17 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1112, 93, 'eaque hic asperiores', 'INV-016ML', '100000.00', 'capture', '2025-03-15 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1113, 93, 'dolorem laborum nihil', 'INV-051OU', '100000.00', 'capture', '2025-04-08 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1114, 93, 'ipsa reprehenderit et', 'INV-655XJ', '100000.00', 'capture', '2025-01-21 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1115, 93, 'sunt hic porro', 'INV-855LT', '100000.00', 'capture', '2025-05-22 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1116, 93, 'atque quaerat numquam', 'INV-626WP', '100000.00', 'capture', '2025-02-22 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1117, 94, 'voluptatem totam et', 'INV-042MV', '100000.00', 'capture', '2025-01-18 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1118, 94, 'consequatur est voluptate', 'INV-762SR', '100000.00', 'capture', '2025-02-27 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1119, 94, 'rem dolorem et', 'INV-282NV', '100000.00', 'capture', '2025-05-25 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1120, 94, 'non accusamus qui', 'INV-778WX', '100000.00', 'capture', '2025-01-07 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1121, 94, 'vel in minus', 'INV-015FL', '100000.00', 'capture', '2025-04-18 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1122, 94, 'iusto repellendus facilis', 'INV-682NG', '100000.00', 'capture', '2025-06-06 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1123, 94, 'amet doloribus iusto', 'INV-440UM', '100000.00', 'capture', '2025-02-27 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1124, 94, 'in reiciendis adipisci', 'INV-295KB', '100000.00', 'capture', '2025-01-08 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1125, 94, 'optio et reiciendis', 'INV-713NH', '100000.00', 'capture', '2025-06-06 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1126, 94, 'et veniam quidem', 'INV-241CK', '100000.00', 'capture', '2024-12-15 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1127, 94, 'consequuntur provident accusamus', 'INV-475VA', '100000.00', 'capture', '2025-05-25 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1128, 94, 'minima porro nemo', 'INV-693UW', '100000.00', 'capture', '2024-12-15 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1129, 95, 'vero repellendus quis', 'INV-100AS', '100000.00', 'capture', '2025-03-28 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1130, 95, 'repellat similique iusto', 'INV-670TO', '100000.00', 'capture', '2025-03-08 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1131, 95, 'totam ab quidem', 'INV-041ME', '100000.00', 'capture', '2024-12-18 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1132, 95, 'sed qui id', 'INV-934WN', '100000.00', 'capture', '2025-01-12 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1133, 95, 'quidem ab neque', 'INV-873YF', '100000.00', 'capture', '2025-01-05 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1134, 95, 'quia dolorem repellat', 'INV-823YH', '100000.00', 'capture', '2024-12-27 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1135, 95, 'et aspernatur dignissimos', 'INV-892IV', '100000.00', 'capture', '2025-02-03 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1136, 95, 'dolorum voluptatibus animi', 'INV-468VU', '100000.00', 'capture', '2025-02-16 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1137, 95, 'odio aspernatur quia', 'INV-649MS', '100000.00', 'capture', '2025-03-04 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1138, 95, 'neque sit qui', 'INV-470XF', '100000.00', 'capture', '2025-02-05 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1139, 95, 'ut culpa facere', 'INV-381IU', '100000.00', 'capture', '2025-01-19 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1140, 95, 'animi doloribus et', 'INV-059RF', '100000.00', 'capture', '2025-02-10 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1141, 96, 'mollitia sed sequi', 'INV-786PS', '100000.00', 'capture', '2025-01-17 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1142, 96, 'tenetur quia et', 'INV-587XZ', '100000.00', 'capture', '2025-04-10 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1143, 96, 'dolorum at excepturi', 'INV-457IP', '100000.00', 'capture', '2025-01-25 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1144, 96, 'incidunt est maiores', 'INV-952WG', '100000.00', 'capture', '2024-12-19 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1145, 96, 'quaerat ea accusamus', 'INV-827GD', '100000.00', 'capture', '2024-12-19 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1146, 96, 'omnis natus dolores', 'INV-991PW', '100000.00', 'capture', '2025-01-02 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1147, 96, 'odio quia iste', 'INV-812KO', '100000.00', 'capture', '2025-04-16 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1148, 96, 'enim tempora et', 'INV-508LX', '100000.00', 'capture', '2025-01-17 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1149, 96, 'sint doloremque inventore', 'INV-011GE', '100000.00', 'capture', '2025-04-29 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1150, 96, 'natus ducimus et', 'INV-565SY', '100000.00', 'capture', '2025-04-20 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1151, 96, 'qui maiores id', 'INV-854TE', '100000.00', 'capture', '2025-01-28 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1152, 96, 'vitae ut ea', 'INV-277VP', '100000.00', 'capture', '2025-03-18 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1153, 97, 'voluptatibus quia et', 'INV-402BT', '100000.00', 'capture', '2025-04-28 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1154, 97, 'et debitis facilis', 'INV-166WH', '100000.00', 'capture', '2025-05-24 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1155, 97, 'perspiciatis accusamus cum', 'INV-543ZD', '100000.00', 'capture', '2024-12-22 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1156, 97, 'quo laudantium et', 'INV-976LS', '100000.00', 'capture', '2025-05-02 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1157, 97, 'sed aperiam deserunt', 'INV-055UY', '100000.00', 'capture', '2025-05-19 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1158, 97, 'qui ullam mollitia', 'INV-930OT', '100000.00', 'capture', '2024-12-20 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1159, 97, 'aut qui sed', 'INV-401QG', '100000.00', 'capture', '2025-04-09 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1160, 97, 'soluta fugiat sequi', 'INV-894BW', '100000.00', 'capture', '2025-05-13 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1161, 97, 'id hic nesciunt', 'INV-622FV', '100000.00', 'capture', '2025-03-24 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1162, 97, 'velit magni doloribus', 'INV-861LF', '100000.00', 'capture', '2025-02-21 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1163, 97, 'rem et pariatur', 'INV-389GQ', '100000.00', 'capture', '2025-01-17 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1164, 97, 'facilis autem vitae', 'INV-615CH', '100000.00', 'capture', '2025-02-06 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1165, 98, 'et illo illo', 'INV-091VG', '100000.00', 'capture', '2025-04-06 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1166, 98, 'consequatur cumque impedit', 'INV-537GE', '100000.00', 'capture', '2025-06-10 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1167, 98, 'tempora rerum distinctio', 'INV-852AZ', '100000.00', 'capture', '2025-06-06 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1168, 98, 'consequatur et eos', 'INV-888NM', '100000.00', 'capture', '2025-01-02 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1169, 98, 'eum et architecto', 'INV-817CQ', '100000.00', 'capture', '2024-12-15 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1170, 98, 'a dolor ut', 'INV-574IR', '100000.00', 'capture', '2025-01-18 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1171, 98, 'quasi molestias autem', 'INV-707RE', '100000.00', 'capture', '2025-05-13 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1172, 98, 'deleniti voluptas quod', 'INV-119BS', '100000.00', 'capture', '2025-03-04 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1173, 98, 'nihil ipsa eius', 'INV-645LL', '100000.00', 'capture', '2025-01-11 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1174, 98, 'quidem repellendus quas', 'INV-951EN', '100000.00', 'capture', '2025-04-22 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1175, 98, 'aspernatur quia ab', 'INV-432TI', '100000.00', 'capture', '2025-03-13 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1176, 98, 'adipisci sit reiciendis', 'INV-168QL', '100000.00', 'capture', '2025-01-28 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1177, 99, 'enim voluptatem eum', 'INV-938JP', '100000.00', 'capture', '2025-01-11 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1178, 99, 'aut est officia', 'INV-216QM', '100000.00', 'capture', '2025-02-22 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1179, 99, 'omnis quis nulla', 'INV-179KL', '100000.00', 'capture', '2025-05-29 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1180, 99, 'animi veritatis expedita', 'INV-143YJ', '100000.00', 'capture', '2025-04-16 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1181, 99, 'voluptas doloremque omnis', 'INV-273EA', '100000.00', 'capture', '2025-02-24 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1182, 99, 'cupiditate explicabo excepturi', 'INV-471BG', '100000.00', 'capture', '2025-02-22 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1183, 99, 'et recusandae praesentium', 'INV-220ZV', '100000.00', 'capture', '2025-04-08 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1184, 99, 'placeat ab praesentium', 'INV-476MA', '100000.00', 'capture', '2025-02-09 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1185, 99, 'dolores sunt dicta', 'INV-829UC', '100000.00', 'capture', '2024-12-19 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1186, 99, 'cupiditate at pariatur', 'INV-221MT', '100000.00', 'capture', '2025-06-02 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1187, 99, 'similique quis sint', 'INV-981QB', '100000.00', 'capture', '2025-03-03 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1188, 99, 'iusto rerum voluptatibus', 'INV-022FV', '100000.00', 'capture', '2025-04-20 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1189, 100, 'expedita sint consequatur', 'INV-639GB', '100000.00', 'capture', '2025-03-28 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1190, 100, 'in quidem minima', 'INV-453KF', '100000.00', 'capture', '2025-05-11 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1191, 100, 'quos eius maxime', 'INV-941YU', '100000.00', 'capture', '2025-01-13 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1192, 100, 'qui autem quos', 'INV-907IZ', '100000.00', 'capture', '2025-06-07 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1193, 100, 'reiciendis ut aut', 'INV-440NB', '100000.00', 'capture', '2024-12-26 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1194, 100, 'quia dolorem enim', 'INV-514JZ', '100000.00', 'capture', '2025-04-09 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1195, 100, 'ut et eos', 'INV-515CQ', '100000.00', 'capture', '2025-04-09 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1196, 100, 'doloremque debitis id', 'INV-903NO', '100000.00', 'capture', '2025-04-12 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1197, 100, 'laborum nesciunt et', 'INV-170DM', '100000.00', 'capture', '2025-01-20 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1198, 100, 'fugit eum corporis', 'INV-165DB', '100000.00', 'capture', '2025-04-14 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1199, 100, 'occaecati facere dignissimos', 'INV-450JL', '100000.00', 'capture', '2025-06-10 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1200, 100, 'doloribus explicabo repudiandae', 'INV-522YJ', '100000.00', 'capture', '2025-01-18 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1201, 101, 'vel dolorum iste', 'INV-330HA', '100000.00', 'capture', '2024-12-16 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1202, 101, 'odit et earum', 'INV-970BS', '100000.00', 'capture', '2024-12-27 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1203, 101, 'aut aut tempore', 'INV-147LC', '100000.00', 'capture', '2024-12-15 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1204, 101, 'non rerum sapiente', 'INV-058CS', '100000.00', 'capture', '2025-03-18 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1205, 101, 'sit quia dolores', 'INV-603GK', '100000.00', 'capture', '2025-01-09 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1206, 101, 'ut earum consequatur', 'INV-171CT', '100000.00', 'capture', '2025-02-09 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1207, 101, 'quia veniam adipisci', 'INV-008MA', '100000.00', 'capture', '2024-12-27 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1208, 101, 'dignissimos a doloremque', 'INV-481RT', '100000.00', 'capture', '2025-01-08 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1209, 101, 'et fugit non', 'INV-062BG', '100000.00', 'capture', '2025-05-11 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1210, 101, 'dolore est sit', 'INV-773MZ', '100000.00', 'capture', '2025-02-25 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1211, 101, 'maxime voluptatum et', 'INV-568EP', '100000.00', 'capture', '2025-03-17 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1212, 101, 'non aut quo', 'INV-268FT', '100000.00', 'capture', '2025-06-07 00:00:00', '2025-06-14 17:04:18', '2025-06-14 17:04:18'),
(1213, 1, 'Pembayaran UKT', 'INV-20250615-5G3TP2', '10000.00', 'settlement', '2025-06-15 00:00:00', '2025-06-15 15:45:57', '2025-06-16 17:07:17'),
(1214, 1, 'Pembayaran SPP Bulan Juni', 'INV-20250615-PAITBR', '300000.00', 'settlement', '2025-06-15 00:00:00', '2025-06-15 15:48:07', '2025-06-16 17:07:18'),
(1215, 1, 'jkadkjad', 'INV-20250615-ZGLEY8', '25000.00', 'expire', '2025-06-16 00:00:00', '2025-06-15 22:27:28', '2025-06-16 22:30:45'),
(1216, 1, 'nsmdnfsmdfn', 'INV-20250615-4WLI6C', '80000.00', 'expire', '2025-06-16 00:00:00', '2025-06-15 22:27:50', '2025-06-16 22:30:46'),
(1217, 1, 'cbcvbcvb', 'INV-20250616-7O41IN', '20000.00', 'settlement', '2025-06-16 00:00:00', '2025-06-16 10:21:54', '2025-06-16 17:12:21'),
(1218, 1, 'cbcvbqweqwe', 'INV-20250616-USOPEI', '50000.00', 'settlement', '2025-06-16 00:00:00', '2025-06-16 10:22:14', '2025-06-16 17:12:23'),
(1219, 1, 'Pembayaran SPP-VkN85C', 'INV-20250618-D9A89D', '20000.00', 'settlement', '2025-06-18 00:00:00', '2025-06-17 17:38:40', '2025-06-18 09:21:35'),
(1220, 1, 'Pembayaran SPP-IhXvZ9', 'INV-20250618-E9CDFC', '20000.00', 'settlement', '2025-06-18 00:00:00', '2025-06-17 17:38:40', '2025-06-18 09:25:14'),
(1221, 1, 'Pembayaran SPP-HHp5SQ', 'INV-20250618-F672F2', '20000.00', 'capture', '2025-06-18 00:00:00', '2025-06-17 17:38:40', '2025-06-17 17:38:40'),
(1222, 1, 'Pembayaran SPP-dIrtIk', 'INV-20250618-5483C5', '20000.00', 'capture', '2025-06-18 00:00:00', '2025-06-17 17:38:40', '2025-06-17 17:38:40'),
(1223, 1, 'Pembayaran SPP-WeZUx3', 'INV-20250618-A5DE42', '20000.00', 'capture', '2025-06-18 00:00:00', '2025-06-17 17:38:40', '2025-06-17 17:38:40'),
(1224, 1, 'Pembayaran SPP-Z17Gik', 'INV-20250618-F38ACB', '20000.00', 'capture', '2025-06-18 00:00:00', '2025-06-17 17:38:40', '2025-06-17 17:38:40'),
(1225, 1, 'Pembayaran SPP-Be5V5S', 'INV-20250618-E3F484', '20000.00', 'capture', '2025-06-18 00:00:00', '2025-06-17 17:38:40', '2025-06-17 17:38:40'),
(1226, 1, 'Pembayaran SPP-DyYby2', 'INV-20250618-D10400', '20000.00', 'capture', '2025-06-18 00:00:00', '2025-06-17 17:38:40', '2025-06-17 17:38:40'),
(1227, 1, 'Pembayaran SPP-x8byCK', 'INV-20250618-F072EC', '20000.00', 'settlement', '2025-06-18 00:00:00', '2025-06-17 17:38:40', '2025-06-18 09:15:45');

-- --------------------------------------------------------

--
-- Table structure for table `transaksis`
--

CREATE TABLE `transaksis` (
  `id` bigint UNSIGNED NOT NULL,
  `tagihan_id` bigint UNSIGNED NOT NULL,
  `metode_pembayaran` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `detail_charge` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transaksis`
--

INSERT INTO `transaksis` (`id`, `tagihan_id`, `metode_pembayaran`, `provider`, `detail_charge`, `created_at`, `updated_at`) VALUES
(1, 1, 'e_wallet', 'shopeepay', '\"{\\\"status_code\\\":\\\"201\\\",\\\"status_message\\\":\\\"Shopeepay transaction is created\\\",\\\"transaction_id\\\":\\\"e12ed255-51d3-4cad-ba92-cbf004d5b2c8\\\",\\\"order_id\\\":\\\"INV-783EY\\\",\\\"merchant_id\\\":\\\"G952296482\\\",\\\"gross_amount\\\":\\\"100000.00\\\",\\\"currency\\\":\\\"IDR\\\",\\\"payment_type\\\":\\\"shopeepay\\\",\\\"transaction_time\\\":\\\"2025-06-15 00:10:49\\\",\\\"transaction_status\\\":\\\"pending\\\",\\\"fraud_status\\\":\\\"accept\\\",\\\"actions\\\":[{\\\"name\\\":\\\"deeplink-redirect\\\",\\\"method\\\":\\\"GET\\\",\\\"url\\\":\\\"https:\\\\/\\\\/simulator.sandbox.midtrans.com\\\\/shopeepay\\\\/payment-pin?referenceId=A120250614171049RSVlMpNUbNID-1\\\"}],\\\"channel_response_code\\\":\\\"0\\\",\\\"channel_response_message\\\":\\\"success\\\",\\\"expiry_time\\\":\\\"2025-06-15 00:25:49\\\"}\"', '2025-06-14 17:10:44', '2025-06-14 17:10:44'),
(2, 2, 'bank_transfer', 'bca', '\"{\\\"order_id\\\":\\\"INV-098PR\\\",\\\"status_code\\\":\\\"407\\\",\\\"gross_amount\\\":\\\"100000.00\\\",\\\"signature_key\\\":\\\"f640ca12223be6386ca149689a702d14b3ec5e8b57c7d3d54bf228c4290bc6a241128917effce23c1d5be46db221e0d8fb76816e43ce53ad6ba8ddda4482c2bb\\\",\\\"transaction_status\\\":\\\"expire\\\"}\"', '2025-06-14 17:12:13', '2025-06-17 11:02:24'),
(3, 182, 'bank_transfer', 'bri', '\"{\\\"status_code\\\":\\\"201\\\",\\\"status_message\\\":\\\"Success, Bank Transfer transaction is created\\\",\\\"transaction_id\\\":\\\"950878d6-e43a-4d1d-9083-0c0e23739dd2\\\",\\\"order_id\\\":\\\"INV-133UF\\\",\\\"merchant_id\\\":\\\"G952296482\\\",\\\"gross_amount\\\":\\\"100000.00\\\",\\\"currency\\\":\\\"IDR\\\",\\\"payment_type\\\":\\\"bank_transfer\\\",\\\"transaction_time\\\":\\\"2025-06-15 00:34:32\\\",\\\"transaction_status\\\":\\\"pending\\\",\\\"fraud_status\\\":\\\"accept\\\",\\\"va_numbers\\\":[{\\\"bank\\\":\\\"bri\\\",\\\"va_number\\\":\\\"964827273711157115\\\"}],\\\"expiry_time\\\":\\\"2025-06-16 00:34:32\\\"}\"', '2025-06-14 17:34:26', '2025-06-14 17:34:26'),
(4, 3, 'e_wallet', 'shopeepay', '\"{\\\"status_code\\\":\\\"201\\\",\\\"status_message\\\":\\\"Shopeepay transaction is created\\\",\\\"transaction_id\\\":\\\"6614cde3-91f5-4c71-94d9-be21d0bc491c\\\",\\\"order_id\\\":\\\"INV-689RS\\\",\\\"merchant_id\\\":\\\"G952296482\\\",\\\"gross_amount\\\":\\\"100000.00\\\",\\\"currency\\\":\\\"IDR\\\",\\\"payment_type\\\":\\\"shopeepay\\\",\\\"transaction_time\\\":\\\"2025-06-15 14:29:54\\\",\\\"transaction_status\\\":\\\"pending\\\",\\\"fraud_status\\\":\\\"accept\\\",\\\"actions\\\":[{\\\"name\\\":\\\"deeplink-redirect\\\",\\\"method\\\":\\\"GET\\\",\\\"url\\\":\\\"https:\\\\/\\\\/simulator.sandbox.midtrans.com\\\\/shopeepay\\\\/payment-pin?referenceId=A120250615072954WT84YyVGDcID-1\\\"}],\\\"channel_response_code\\\":\\\"0\\\",\\\"channel_response_message\\\":\\\"success\\\",\\\"expiry_time\\\":\\\"2025-06-15 14:44:54\\\"}\"', '2025-06-15 07:29:49', '2025-06-15 07:29:49'),
(5, 1105, 'e_wallet', 'gopay', '\"{\\\"status_code\\\":\\\"201\\\",\\\"status_message\\\":\\\"Gopay transaction is created\\\",\\\"transaction_id\\\":\\\"58fecde4-9924-4535-b834-b79d02fbf510\\\",\\\"order_id\\\":\\\"INV-838TH\\\",\\\"merchant_id\\\":\\\"G952296482\\\",\\\"gross_amount\\\":\\\"100000.00\\\",\\\"currency\\\":\\\"IDR\\\",\\\"payment_type\\\":\\\"gopay\\\",\\\"transaction_time\\\":\\\"2025-06-15 18:33:40\\\",\\\"transaction_status\\\":\\\"pending\\\",\\\"fraud_status\\\":\\\"accept\\\",\\\"actions\\\":[{\\\"name\\\":\\\"generate-qr-code\\\",\\\"method\\\":\\\"GET\\\",\\\"url\\\":\\\"https:\\\\/\\\\/api.sandbox.midtrans.com\\\\/v2\\\\/gopay\\\\/58fecde4-9924-4535-b834-b79d02fbf510\\\\/qr-code\\\"},{\\\"name\\\":\\\"deeplink-redirect\\\",\\\"method\\\":\\\"GET\\\",\\\"url\\\":\\\"https:\\\\/\\\\/simulator.sandbox.midtrans.com\\\\/v2\\\\/deeplink\\\\/detail?tref=A120250615113340AdAVnJGnaQID&callbackUrl=https%3A%2F%2Flocal.jtech.my.id%2Fpembayaran-tagihan%2Fcallback%3Forder_id%3DINV-838TH\\\"},{\\\"name\\\":\\\"get-status\\\",\\\"method\\\":\\\"GET\\\",\\\"url\\\":\\\"https:\\\\/\\\\/api.sandbox.midtrans.com\\\\/v2\\\\/58fecde4-9924-4535-b834-b79d02fbf510\\\\/status\\\"},{\\\"name\\\":\\\"cancel\\\",\\\"method\\\":\\\"POST\\\",\\\"url\\\":\\\"https:\\\\/\\\\/api.sandbox.midtrans.com\\\\/v2\\\\/58fecde4-9924-4535-b834-b79d02fbf510\\\\/cancel\\\"}],\\\"expiry_time\\\":\\\"2025-06-15 18:48:40\\\"}\"', '2025-06-15 11:33:35', '2025-06-15 11:33:35'),
(6, 4, 'bank_transfer', 'bni', '\"{\\\"status_code\\\":\\\"201\\\",\\\"status_message\\\":\\\"Success, Bank Transfer transaction is created\\\",\\\"transaction_id\\\":\\\"c202532d-02c3-4f56-b272-5fcc238aa661\\\",\\\"order_id\\\":\\\"INV-830GY\\\",\\\"merchant_id\\\":\\\"G952296482\\\",\\\"gross_amount\\\":\\\"100000.00\\\",\\\"currency\\\":\\\"IDR\\\",\\\"payment_type\\\":\\\"bank_transfer\\\",\\\"transaction_time\\\":\\\"2025-06-15 18:44:20\\\",\\\"transaction_status\\\":\\\"pending\\\",\\\"fraud_status\\\":\\\"accept\\\",\\\"va_numbers\\\":[{\\\"bank\\\":\\\"bni\\\",\\\"va_number\\\":\\\"9889648244836876\\\"}],\\\"expiry_time\\\":\\\"2025-06-16 18:44:20\\\"}\"', '2025-06-15 11:44:15', '2025-06-15 11:44:15'),
(7, 5, 'e_wallet', 'shopeepay', '\"{\\\"status_code\\\":\\\"201\\\",\\\"status_message\\\":\\\"Shopeepay transaction is created\\\",\\\"transaction_id\\\":\\\"ceb45231-630e-4917-a846-1f54d94172b6\\\",\\\"order_id\\\":\\\"INV-747AD\\\",\\\"merchant_id\\\":\\\"G952296482\\\",\\\"gross_amount\\\":\\\"100000.00\\\",\\\"currency\\\":\\\"IDR\\\",\\\"payment_type\\\":\\\"shopeepay\\\",\\\"transaction_time\\\":\\\"2025-06-15 19:23:28\\\",\\\"transaction_status\\\":\\\"pending\\\",\\\"fraud_status\\\":\\\"accept\\\",\\\"actions\\\":[{\\\"name\\\":\\\"deeplink-redirect\\\",\\\"method\\\":\\\"GET\\\",\\\"url\\\":\\\"https:\\\\/\\\\/simulator.sandbox.midtrans.com\\\\/shopeepay\\\\/payment-pin?referenceId=A120250615122328mYwevo1d53ID-1\\\"}],\\\"channel_response_code\\\":\\\"0\\\",\\\"channel_response_message\\\":\\\"success\\\",\\\"expiry_time\\\":\\\"2025-06-15 19:38:28\\\"}\"', '2025-06-15 12:23:23', '2025-06-15 12:23:23'),
(8, 6, 'e_wallet', 'shopeepay', '\"{\\\"status_code\\\":\\\"201\\\",\\\"status_message\\\":\\\"Shopeepay transaction is created\\\",\\\"transaction_id\\\":\\\"debcf8d5-d8df-4364-8902-62d1d4da16b1\\\",\\\"order_id\\\":\\\"INV-160DN\\\",\\\"merchant_id\\\":\\\"G952296482\\\",\\\"gross_amount\\\":\\\"100000.00\\\",\\\"currency\\\":\\\"IDR\\\",\\\"payment_type\\\":\\\"shopeepay\\\",\\\"transaction_time\\\":\\\"2025-06-15 19:25:20\\\",\\\"transaction_status\\\":\\\"pending\\\",\\\"fraud_status\\\":\\\"accept\\\",\\\"actions\\\":[{\\\"name\\\":\\\"deeplink-redirect\\\",\\\"method\\\":\\\"GET\\\",\\\"url\\\":\\\"https:\\\\/\\\\/simulator.sandbox.midtrans.com\\\\/shopeepay\\\\/payment-pin?referenceId=A120250615122520aUIV83tSsaID-1\\\"}],\\\"channel_response_code\\\":\\\"0\\\",\\\"channel_response_message\\\":\\\"success\\\",\\\"expiry_time\\\":\\\"2025-06-15 19:40:20\\\"}\"', '2025-06-15 12:25:15', '2025-06-15 12:25:15'),
(9, 7, 'e_wallet', 'shopeepay', '\"{\\\"status_code\\\":\\\"201\\\",\\\"status_message\\\":\\\"Shopeepay transaction is created\\\",\\\"transaction_id\\\":\\\"aea1fcab-792e-4d1d-9f25-1855fb4abbe4\\\",\\\"order_id\\\":\\\"INV-287WD\\\",\\\"merchant_id\\\":\\\"G952296482\\\",\\\"gross_amount\\\":\\\"100000.00\\\",\\\"currency\\\":\\\"IDR\\\",\\\"payment_type\\\":\\\"shopeepay\\\",\\\"transaction_time\\\":\\\"2025-06-15 19:43:28\\\",\\\"transaction_status\\\":\\\"pending\\\",\\\"fraud_status\\\":\\\"accept\\\",\\\"actions\\\":[{\\\"name\\\":\\\"deeplink-redirect\\\",\\\"method\\\":\\\"GET\\\",\\\"url\\\":\\\"https:\\\\/\\\\/simulator.sandbox.midtrans.com\\\\/shopeepay\\\\/payment-pin?referenceId=A120250615124328k7emdv8qJeID-1\\\"}],\\\"channel_response_code\\\":\\\"0\\\",\\\"channel_response_message\\\":\\\"success\\\",\\\"expiry_time\\\":\\\"2025-06-15 19:58:28\\\"}\"', '2025-06-15 12:43:22', '2025-06-15 12:43:22'),
(10, 12, 'cstore', NULL, '\"{\\\"status_code\\\":\\\"201\\\",\\\"status_message\\\":\\\"Success, cstore transaction is successful\\\",\\\"transaction_id\\\":\\\"23062c93-1e20-47ae-a044-db0fb9de35e9\\\",\\\"order_id\\\":\\\"INV-898CF\\\",\\\"merchant_id\\\":\\\"G952296482\\\",\\\"gross_amount\\\":\\\"100000.00\\\",\\\"currency\\\":\\\"IDR\\\",\\\"payment_type\\\":\\\"cstore\\\",\\\"transaction_time\\\":\\\"2025-06-15 20:16:01\\\",\\\"transaction_status\\\":\\\"pending\\\",\\\"fraud_status\\\":\\\"accept\\\",\\\"expiry_time\\\":\\\"2025-06-16 20:16:01\\\",\\\"payment_code\\\":\\\"9522128278523482\\\",\\\"store\\\":\\\"alfamart\\\"}\"', '2025-06-15 13:15:55', '2025-06-15 13:15:55'),
(11, 8, 'cstore', 'alfamart', '\"{\\\"status_code\\\":\\\"200\\\",\\\"transaction_id\\\":\\\"08347e6c-1ce1-456c-be38-4e3f7efd8016\\\",\\\"gross_amount\\\":\\\"100000.00\\\",\\\"currency\\\":\\\"IDR\\\",\\\"order_id\\\":\\\"INV-372CF\\\",\\\"payment_type\\\":\\\"cstore\\\",\\\"signature_key\\\":\\\"18366914ede04646f656774652c91f70de3a56e5e8f690b8718a9e0a50a9843ce19db5d2974663a31e2831562315738ebc9eed2e4ad8e2654f4b45f6755582aa\\\",\\\"transaction_status\\\":\\\"settlement\\\",\\\"fraud_status\\\":\\\"accept\\\",\\\"status_message\\\":\\\"Success, transaction is found\\\",\\\"merchant_id\\\":\\\"G952296482\\\",\\\"payment_code\\\":\\\"9522361034444595\\\",\\\"store\\\":\\\"alfamart\\\",\\\"transaction_time\\\":\\\"2025-06-15 19:54:11\\\",\\\"settlement_time\\\":\\\"2025-06-15 20:19:45\\\",\\\"expiry_time\\\":\\\"2025-06-16 19:54:11\\\"}\"', '2025-06-15 13:21:13', '2025-06-15 13:21:13'),
(12, 181, 'e_wallet', 'shopeepay', '\"{\\\"status_code\\\":\\\"201\\\",\\\"status_message\\\":\\\"Shopeepay transaction is created\\\",\\\"transaction_id\\\":\\\"801d9830-20ce-4b9e-a0d1-c9e85b5d434b\\\",\\\"order_id\\\":\\\"INV-146VR\\\",\\\"merchant_id\\\":\\\"G952296482\\\",\\\"gross_amount\\\":\\\"100000.00\\\",\\\"currency\\\":\\\"IDR\\\",\\\"payment_type\\\":\\\"shopeepay\\\",\\\"transaction_time\\\":\\\"2025-06-16 00:50:21\\\",\\\"transaction_status\\\":\\\"pending\\\",\\\"fraud_status\\\":\\\"accept\\\",\\\"actions\\\":[{\\\"name\\\":\\\"deeplink-redirect\\\",\\\"method\\\":\\\"GET\\\",\\\"url\\\":\\\"https:\\\\/\\\\/simulator.sandbox.midtrans.com\\\\/shopeepay\\\\/payment-pin?referenceId=A120250615175021OWqAbd2cbuID-1\\\"}],\\\"channel_response_code\\\":\\\"0\\\",\\\"channel_response_message\\\":\\\"success\\\",\\\"expiry_time\\\":\\\"2025-06-16 01:05:21\\\"}\"', '2025-06-15 17:50:15', '2025-06-15 17:50:15'),
(13, 1213, 'bank_transfer', 'permata', '\"{\\\"transaction_time\\\":\\\"2025-06-16 02:41:29\\\",\\\"transaction_status\\\":\\\"settlement\\\",\\\"transaction_id\\\":\\\"bb29699d-4ac4-4321-89e2-1927ca3dd380\\\",\\\"status_message\\\":\\\"midtrans payment notification\\\",\\\"status_code\\\":\\\"200\\\",\\\"signature_key\\\":\\\"5b4bf0d9f03c76cc5df164a7350cb3a230c9a6a781435cc92e37b1d6b23ac051f778a2677ed565dba9a01ea2ce46644925059b4a5f344fde681c6510ab3c6647\\\",\\\"settlement_time\\\":\\\"2025-06-16 05:21:12\\\",\\\"permata_va_number\\\":\\\"9640046062651734\\\",\\\"payment_type\\\":\\\"bank_transfer\\\",\\\"order_id\\\":\\\"INV-20250615-5G3TP2||INV-20250615-PAITBR\\\",\\\"merchant_id\\\":\\\"G952296482\\\",\\\"gross_amount\\\":\\\"310000.00\\\",\\\"fraud_status\\\":\\\"accept\\\",\\\"expiry_time\\\":\\\"2025-06-17 02:41:29\\\",\\\"currency\\\":\\\"IDR\\\"}\"', '2025-06-15 19:41:23', '2025-06-16 17:07:17'),
(14, 1214, 'bank_transfer', 'permata', '\"{\\\"transaction_time\\\":\\\"2025-06-16 02:41:29\\\",\\\"transaction_status\\\":\\\"settlement\\\",\\\"transaction_id\\\":\\\"bb29699d-4ac4-4321-89e2-1927ca3dd380\\\",\\\"status_message\\\":\\\"midtrans payment notification\\\",\\\"status_code\\\":\\\"200\\\",\\\"signature_key\\\":\\\"5b4bf0d9f03c76cc5df164a7350cb3a230c9a6a781435cc92e37b1d6b23ac051f778a2677ed565dba9a01ea2ce46644925059b4a5f344fde681c6510ab3c6647\\\",\\\"settlement_time\\\":\\\"2025-06-16 05:21:12\\\",\\\"permata_va_number\\\":\\\"9640046062651734\\\",\\\"payment_type\\\":\\\"bank_transfer\\\",\\\"order_id\\\":\\\"INV-20250615-5G3TP2||INV-20250615-PAITBR\\\",\\\"merchant_id\\\":\\\"G952296482\\\",\\\"gross_amount\\\":\\\"310000.00\\\",\\\"fraud_status\\\":\\\"accept\\\",\\\"expiry_time\\\":\\\"2025-06-17 02:41:29\\\",\\\"currency\\\":\\\"IDR\\\"}\"', '2025-06-15 19:41:23', '2025-06-16 17:07:18'),
(15, 1215, 'bank_transfer', 'bca', '\"{\\\"va_numbers\\\":[{\\\"va_number\\\":\\\"96482636935556896099978\\\",\\\"bank\\\":\\\"bca\\\"}],\\\"transaction_time\\\":\\\"2025-06-16 05:29:58\\\",\\\"transaction_status\\\":\\\"expire\\\",\\\"transaction_id\\\":\\\"7397c51c-0229-4446-b0d1-f9acb5deb3ed\\\",\\\"status_message\\\":\\\"midtrans payment notification\\\",\\\"status_code\\\":\\\"202\\\",\\\"signature_key\\\":\\\"d626ed506dd784806fb642dbf7aa165ec3982a25b2f18deacde6caa6aeb575c234644bd31de4441a319e3fa3909f7576afc6dfaee8a83be3ac4868e5363ac8de\\\",\\\"payment_type\\\":\\\"bank_transfer\\\",\\\"payment_amounts\\\":[],\\\"order_id\\\":\\\"INV-20250615-ZGLEY8__INV-20250615-4WLI6C\\\",\\\"merchant_id\\\":\\\"G952296482\\\",\\\"gross_amount\\\":\\\"105000.00\\\",\\\"fraud_status\\\":\\\"accept\\\",\\\"expiry_time\\\":\\\"2025-06-17 05:29:58\\\",\\\"currency\\\":\\\"IDR\\\"}\"', '2025-06-15 22:29:43', '2025-06-16 22:30:45'),
(16, 1216, 'bank_transfer', 'bca', '\"{\\\"va_numbers\\\":[{\\\"va_number\\\":\\\"96482636935556896099978\\\",\\\"bank\\\":\\\"bca\\\"}],\\\"transaction_time\\\":\\\"2025-06-16 05:29:58\\\",\\\"transaction_status\\\":\\\"expire\\\",\\\"transaction_id\\\":\\\"7397c51c-0229-4446-b0d1-f9acb5deb3ed\\\",\\\"status_message\\\":\\\"midtrans payment notification\\\",\\\"status_code\\\":\\\"202\\\",\\\"signature_key\\\":\\\"d626ed506dd784806fb642dbf7aa165ec3982a25b2f18deacde6caa6aeb575c234644bd31de4441a319e3fa3909f7576afc6dfaee8a83be3ac4868e5363ac8de\\\",\\\"payment_type\\\":\\\"bank_transfer\\\",\\\"payment_amounts\\\":[],\\\"order_id\\\":\\\"INV-20250615-ZGLEY8__INV-20250615-4WLI6C\\\",\\\"merchant_id\\\":\\\"G952296482\\\",\\\"gross_amount\\\":\\\"105000.00\\\",\\\"fraud_status\\\":\\\"accept\\\",\\\"expiry_time\\\":\\\"2025-06-17 05:29:58\\\",\\\"currency\\\":\\\"IDR\\\"}\"', '2025-06-15 22:29:43', '2025-06-16 22:30:46'),
(17, 1217, 'bank_transfer', 'bca', '\"{\\\"va_numbers\\\":[{\\\"va_number\\\":\\\"96482388354803038723746\\\",\\\"bank\\\":\\\"bca\\\"}],\\\"transaction_time\\\":\\\"2025-06-16 17:23:03\\\",\\\"transaction_status\\\":\\\"settlement\\\",\\\"transaction_id\\\":\\\"f55a2e6f-ecae-4c5d-98cd-62190daea15d\\\",\\\"status_message\\\":\\\"midtrans payment notification\\\",\\\"status_code\\\":\\\"200\\\",\\\"signature_key\\\":\\\"830a30cf78537f2b868f933032645eb7de411256a2a2f32703f1730cc632f8687603fd0f65df617e12e96ae9be6660a59801bfd78f3a087b283d9a5ad1d75bf7\\\",\\\"settlement_time\\\":\\\"2025-06-16 17:23:44\\\",\\\"payment_type\\\":\\\"bank_transfer\\\",\\\"payment_amounts\\\":[],\\\"order_id\\\":\\\"INV-20250616-7O41IN__INV-20250616-USOPEI\\\",\\\"merchant_id\\\":\\\"G952296482\\\",\\\"gross_amount\\\":\\\"70000.00\\\",\\\"fraud_status\\\":\\\"accept\\\",\\\"expiry_time\\\":\\\"2025-06-17 17:23:03\\\",\\\"currency\\\":\\\"IDR\\\"}\"', '2025-06-16 10:22:48', '2025-06-16 17:12:21'),
(18, 1218, 'bank_transfer', 'bca', '\"{\\\"va_numbers\\\":[{\\\"va_number\\\":\\\"96482388354803038723746\\\",\\\"bank\\\":\\\"bca\\\"}],\\\"transaction_time\\\":\\\"2025-06-16 17:23:03\\\",\\\"transaction_status\\\":\\\"settlement\\\",\\\"transaction_id\\\":\\\"f55a2e6f-ecae-4c5d-98cd-62190daea15d\\\",\\\"status_message\\\":\\\"midtrans payment notification\\\",\\\"status_code\\\":\\\"200\\\",\\\"signature_key\\\":\\\"830a30cf78537f2b868f933032645eb7de411256a2a2f32703f1730cc632f8687603fd0f65df617e12e96ae9be6660a59801bfd78f3a087b283d9a5ad1d75bf7\\\",\\\"settlement_time\\\":\\\"2025-06-16 17:23:44\\\",\\\"payment_type\\\":\\\"bank_transfer\\\",\\\"payment_amounts\\\":[],\\\"order_id\\\":\\\"INV-20250616-7O41IN__INV-20250616-USOPEI\\\",\\\"merchant_id\\\":\\\"G952296482\\\",\\\"gross_amount\\\":\\\"70000.00\\\",\\\"fraud_status\\\":\\\"accept\\\",\\\"expiry_time\\\":\\\"2025-06-17 17:23:03\\\",\\\"currency\\\":\\\"IDR\\\"}\"', '2025-06-16 10:22:48', '2025-06-16 17:12:23'),
(19, 11, 'e_wallet', 'shopeepay', '\"{\\\"order_id\\\":\\\"INV-470KV\\\",\\\"status_code\\\":\\\"200\\\",\\\"gross_amount\\\":\\\"100000.00\\\",\\\"signature_key\\\":\\\"c73b5f79a7c0c62d373319d689a442e59f688056b5750b80ee760e5d23736cdf845d75b31892cfd73a69cbd2a62104db4bed777e53ec0859d14fd0771b9aa96a\\\",\\\"transaction_status\\\":\\\"settlement\\\"}\"', '2025-06-16 12:15:50', '2025-06-17 11:32:47'),
(20, 10, 'e_wallet', 'shopeepay', '\"{\\\"transaction_time\\\":\\\"2025-06-17 17:35:22\\\",\\\"transaction_status\\\":\\\"settlement\\\",\\\"transaction_id\\\":\\\"29ee05c7-bbca-45ea-9d56-e21ade120080\\\",\\\"status_message\\\":\\\"midtrans payment notification\\\",\\\"status_code\\\":\\\"200\\\",\\\"signature_key\\\":\\\"095f7096275b8b6943aa0869f553b711dde2a73116b0e8a4f086e96f95c3f6b527561b912c0677684d2ffc6359f12dc690270d8303318e4dc857c47c9e8a258d\\\",\\\"shopeepay_reference_number\\\":\\\"804819515458976796\\\",\\\"settlement_time\\\":\\\"2025-06-17 17:35:34\\\",\\\"reference_id\\\":\\\"A120250617103522AoCefcqoECID-1\\\",\\\"payment_type\\\":\\\"shopeepay\\\",\\\"order_id\\\":\\\"INV-223OW\\\",\\\"merchant_id\\\":\\\"G952296482\\\",\\\"gross_amount\\\":\\\"100000.00\\\",\\\"fraud_status\\\":\\\"accept\\\",\\\"expiry_time\\\":\\\"2025-06-17 17:50:22\\\",\\\"currency\\\":\\\"IDR\\\"}\"', '2025-06-17 10:35:07', '2025-06-17 10:59:30'),
(21, 1227, 'e_wallet', 'shopeepay', '\"{\\\"order_id\\\":\\\"INV-20250618-F072EC\\\",\\\"status_code\\\":\\\"200\\\",\\\"gross_amount\\\":\\\"20000.00\\\",\\\"signature_key\\\":\\\"828e7a45bf898622e0e6f24a3a9e50debf779be6f470869d42e010bee9e34fe53359c31a279538da7947754eb8630add2ab122a2d25919b99da541a93ace8c95\\\",\\\"transaction_status\\\":\\\"settlement\\\"}\"', '2025-06-18 09:15:23', '2025-06-18 09:15:45'),
(22, 1219, 'e_wallet', 'shopeepay', '\"{\\\"order_id\\\":\\\"INV-20250618-D9A89D\\\",\\\"status_code\\\":\\\"200\\\",\\\"gross_amount\\\":\\\"20000.00\\\",\\\"signature_key\\\":\\\"c9da17bdaccaf20011b7bc2a752f02d8b6d4cd109b8b13654df26a94c18dc9275f74eb0b31c411928e560c6ff353d9e10455a36ebfc3072b732c5c2e6e6d8881\\\",\\\"transaction_status\\\":\\\"settlement\\\"}\"', '2025-06-18 09:20:55', '2025-06-18 09:21:35'),
(23, 1220, 'e_wallet', 'shopeepay', '\"{\\\"order_id\\\":\\\"INV-20250618-E9CDFC\\\",\\\"status_code\\\":\\\"200\\\",\\\"gross_amount\\\":\\\"20000.00\\\",\\\"signature_key\\\":\\\"e7e6b3d13c5dbbf42754ecac1f4ef531464ab74c6239b84ec5b34261592802256ed71a0057576e47da6013f97ba42f114debf13e4a543c246c8bae68fca1254f\\\",\\\"transaction_status\\\":\\\"settlement\\\"}\"', '2025-06-18 09:25:03', '2025-06-18 09:25:14');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `nama_lengkap` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama_lengkap`, `username`, `email`, `password`, `alamat`, `avatar`, `device_id`, `created_at`, `updated_at`) VALUES
(1, 'Admin Husna Edu Pay', 'admin', 'admin@husnaedupay.com', '$2y$12$oMXBfs71loA9RJl.OtO3qutns4DFPpthFxSPPZvdQyc5GDt4Mvj9a', NULL, 'storage/avatar/tsvBM91Bsgy4mCk9-7443b14c-850f-481e-b9ce-2183f5aa3043.png', 'RP1A.200720.012.A205FXXSBCWC5-Galaxy A20 milik JAUHAR', '2025-06-14 17:03:22', '2025-06-18 08:22:32'),
(2, NULL, 'jboyle', 'spinka.amos@gmail.com', '$2y$12$qrM2r3navCq8/z4ZI4i9eeyye3SntWj/glXWe0WU3VCP69QpDmXUe', NULL, NULL, NULL, '2025-06-14 17:03:23', '2025-06-14 17:03:23'),
(3, NULL, 'solon.beahan', 'coconnell@gmail.com', '$2y$12$846ceO5oHligwK32vJeZH.lZY8eLuzXTO3V4GWeYxegkJg7UbgCOe', NULL, NULL, NULL, '2025-06-14 17:03:23', '2025-06-14 17:03:23'),
(4, NULL, 'oeffertz', 'rolando05@gmail.com', '$2y$12$nw4GybMAF6RHgmg2slNmx.3yeWESgsTn7KSihd3fD5SqYAXSZmIX2', NULL, NULL, NULL, '2025-06-14 17:03:24', '2025-06-14 17:03:24'),
(5, NULL, 'sydnee33', 'aliya.schimmel@cremin.org', '$2y$12$oRIvTGQk3NfxL3C/8Sa8Queo9kZ6zEuovGx0V12rBRy6maS88ytl.', NULL, NULL, NULL, '2025-06-14 17:03:24', '2025-06-14 17:03:24'),
(6, NULL, 'emard.warren', 'bell.haag@gmail.com', '$2y$12$3XqmiPXqQWt9/eh1NX2g1u7qhaVtauaUKdycmnV/R9vjjAu7LVKlm', NULL, NULL, NULL, '2025-06-14 17:03:25', '2025-06-14 17:03:25'),
(7, NULL, 'billie.reichel', 'ybartoletti@yahoo.com', '$2y$12$6QbL/umS41MjoSAz2og8p.BOthm9QCwtcCITV/HtmqzfqSkFbHuYu', NULL, NULL, NULL, '2025-06-14 17:03:25', '2025-06-14 17:03:25'),
(8, NULL, 'aurelie15', 'gutkowski.liliana@grady.com', '$2y$12$RVA67uL8MjZUIh24UacwhePQFdm6x87syJK76JFAjL1JDKfpnIK4W', NULL, NULL, NULL, '2025-06-14 17:03:26', '2025-06-14 17:03:26'),
(9, NULL, 'elta.reichel', 'hhane@gmail.com', '$2y$12$8xVc7aOByii/weiZdwf0PeyETC4kVc9.1RNPZhzJzqx3XksDcUVGy', NULL, NULL, NULL, '2025-06-14 17:03:27', '2025-06-14 17:03:27'),
(10, NULL, 'lweimann', 'sheila94@gaylord.com', '$2y$12$2KzoQiPseWAvFjMoBxc4Ae29e.BcJdyHyCjEbBclFZcBXJ0J2H2O.', NULL, NULL, NULL, '2025-06-14 17:03:27', '2025-06-14 17:03:27'),
(11, NULL, 'ehoeger', 'alexys.runolfsson@yahoo.com', '$2y$12$s4EGFuQoDayM.remJwoRkezFKfBR5yLNYbB8iG1xgacTt1dGko1H2', NULL, NULL, NULL, '2025-06-14 17:03:28', '2025-06-14 17:03:28'),
(12, NULL, 'gregg.leannon', 'austyn.johns@kub.com', '$2y$12$IJPnm6lDZuILNNEplXwwyek9H.7tYdUVcoDACkqu/Lv4a7nrAQCS.', NULL, NULL, NULL, '2025-06-14 17:03:28', '2025-06-14 17:03:28'),
(13, NULL, 'gparisian', 'samara.feeney@bogisich.net', '$2y$12$PsAnYG.iaAHR2i5L06IyZ.yEhU9P2w8fGfkU64P7u3sWORU8Xof9.', NULL, NULL, NULL, '2025-06-14 17:03:29', '2025-06-14 17:03:29'),
(14, NULL, 'lueilwitz.amy', 'edwina.labadie@yahoo.com', '$2y$12$9Ao5UHCYBIABGyaIt1Rw5eHf.Ou/zJkBmYtPo/Rrqw2SdgozzIh12', NULL, NULL, NULL, '2025-06-14 17:03:29', '2025-06-14 17:03:29'),
(15, NULL, 'adrain.gutkowski', 'rudolph.gutkowski@gmail.com', '$2y$12$iC.0ukX39/bpjBr64NDhGuPMLzUyDK41VMdY5XNlYB63h2iUf8qEq', NULL, NULL, NULL, '2025-06-14 17:03:30', '2025-06-14 17:03:30'),
(16, NULL, 'xavier67', 'erin47@pfannerstill.net', '$2y$12$AP4FC2QakBZb2omwnLhXxehJUa4nu8yVpTKHgrjI7uRdyAHagtm.C', NULL, NULL, 'AP3A.240905.015.A2-Redmi 12', '2025-06-14 17:03:30', '2025-06-14 17:33:44'),
(17, NULL, 'robbie.thompson', 'lonie35@hotmail.com', '$2y$12$d2h9DwUxmjuMQdnzye7s0u/ssVDSoC.cTIyb1RrTj3M6zwbjIyq.a', NULL, NULL, NULL, '2025-06-14 17:03:31', '2025-06-14 17:03:31'),
(18, NULL, 'candice91', 'qberge@gmail.com', '$2y$12$8tcYrYwHQ7/r/6LDFPMHre6IBgaDqGYFnBhPfjP61KC4YPTvHsyou', NULL, NULL, NULL, '2025-06-14 17:03:31', '2025-06-14 17:03:31'),
(19, NULL, 'augustus97', 'kaden.nikolaus@hotmail.com', '$2y$12$/17YeOwkAwXoE3Xy2Qgbo.CSngNef/kRMWFswi0ZsXk2L.19x67Ry', NULL, NULL, NULL, '2025-06-14 17:03:32', '2025-06-14 17:03:32'),
(20, NULL, 'ransom.romaguera', 'delilah.beier@yahoo.com', '$2y$12$jw6nsMR9MRmKus0rRIt3l.iQkA7NhUZSMVysrQ30ZMO7ceJNSEYvC', NULL, NULL, NULL, '2025-06-14 17:03:33', '2025-06-14 17:03:33'),
(21, NULL, 'daniel.myra', 'frau@yahoo.com', '$2y$12$I5j.0kCoOnl/.W2rg8MwOOb6..3nLlwvFW4t.SQbERIR65yHPKdGC', NULL, NULL, NULL, '2025-06-14 17:03:33', '2025-06-14 17:03:33'),
(22, NULL, 'hartmann.luisa', 'daugherty.dillan@hotmail.com', '$2y$12$NBbcFW6ldEH8bLbgm5cUDOjC8g9sHbazXV47Z5EuFqYPW5Eg/DAiq', NULL, NULL, NULL, '2025-06-14 17:03:34', '2025-06-14 17:03:34'),
(23, NULL, 'larue.tillman', 'wehner.laura@gmail.com', '$2y$12$tvhtsKBEXGK4dv4LmG6DROtrkqpdOp/l/KxtdmwGAAOC9XYWoceUW', NULL, NULL, NULL, '2025-06-14 17:03:34', '2025-06-14 17:03:34'),
(24, NULL, 'hyman.fahey', 'broderick24@hotmail.com', '$2y$12$yi2mrSifcMsWrUlwffcWYOzpvcWsYjhpvDjPOV6nBrI/tB6vVAKF6', NULL, NULL, NULL, '2025-06-14 17:03:34', '2025-06-14 17:03:34'),
(25, NULL, 'bnienow', 'cristal.schumm@hotmail.com', '$2y$12$jRd2lKOk9HHLF17QcJp61OoE8f9i7S1DdfVZ3.kVhiFkoiwBLW/zW', NULL, NULL, NULL, '2025-06-14 17:03:35', '2025-06-14 17:03:35'),
(26, NULL, 'alyce66', 'jaiden.parisian@marks.biz', '$2y$12$bwPdCRsywAhsi8oLG64Ifu1oqx26YkCyL6J/4kkMDSNtPa0gVtr1K', NULL, NULL, NULL, '2025-06-14 17:03:35', '2025-06-14 17:03:35'),
(27, NULL, 'eldridge57', 'eherman@gmail.com', '$2y$12$BT7yv/3awUQLLLY9UTgN9OKFNPSVnMdeVtbejtRzsTB7nYsUiTxHO', NULL, NULL, NULL, '2025-06-14 17:03:36', '2025-06-14 17:03:36'),
(28, NULL, 'wisoky.florian', 'constance77@jaskolski.com', '$2y$12$/ImRr7ndP8Jd8RPRNEkeo.QsDzereWfpjkGtaY3Vx6rr4iG1eFZaa', NULL, NULL, NULL, '2025-06-14 17:03:36', '2025-06-14 17:03:36'),
(29, NULL, 'zschowalter', 'kkessler@weissnat.com', '$2y$12$4WjdtgqIuSGV3SGUm8PITeLuEGghHKgFkdxYU1zJicw/3ZsgoNOUC', NULL, NULL, NULL, '2025-06-14 17:03:37', '2025-06-14 17:03:37'),
(30, NULL, 'rosenbaum.rozella', 'ckuhn@hotmail.com', '$2y$12$J6SOTAkdFUUt8zNFmSNHke1UufRfTYginuQMMN7DNQbd2IUleX1yS', NULL, NULL, NULL, '2025-06-14 17:03:37', '2025-06-14 17:03:37'),
(31, NULL, 'hertha23', 'turcotte.kyla@upton.info', '$2y$12$ZxGsin4W9GzZqGAaoQ6wgevuT5k9kRAlAkGDbZIFsE0wG.TLf8I2i', NULL, NULL, NULL, '2025-06-14 17:03:38', '2025-06-14 17:03:38'),
(32, NULL, 'melyna.johnston', 'cummerata.amya@yahoo.com', '$2y$12$e3am.wrfEAOf4Esx.2FZL.EiN5s2U2NWgeqVngsn48MP2Ms0vkJo2', NULL, NULL, NULL, '2025-06-14 17:03:38', '2025-06-14 17:03:38'),
(33, NULL, 'devon.okeefe', 'cheyanne.rosenbaum@durgan.net', '$2y$12$0zYBOzM2lrOJVLV1IdSlD.9re0t6SsXb7AjWFLmmeBtFIip0GP0oy', NULL, NULL, NULL, '2025-06-14 17:03:39', '2025-06-14 17:03:39'),
(34, NULL, 'kris.judge', 'rebekah.greenfelder@rippin.info', '$2y$12$xFARoO5yGgc7qoR/mcBcnuWlUJZzgUsKEoWvtF13I0DhZawKeidZW', NULL, NULL, NULL, '2025-06-14 17:03:40', '2025-06-14 17:03:40'),
(35, NULL, 'bayer.adonis', 'phyllis94@halvorson.com', '$2y$12$WfbMvQ/kyW5lRvwvgmje9efwKBADuEL/q0ZhMWHuO9eWsad3Q3ENC', NULL, NULL, NULL, '2025-06-14 17:03:41', '2025-06-14 17:03:41'),
(36, NULL, 'gtowne', 'torrance.nicolas@yahoo.com', '$2y$12$5NiZFqqsLuobc//7ez1YwuUFDMHJpMjNtsf5iND.mCSY5yVO7DBRC', NULL, NULL, NULL, '2025-06-14 17:03:42', '2025-06-14 17:03:42'),
(37, NULL, 'felicita69', 'koepp.annabelle@hotmail.com', '$2y$12$tVg8ybdQcZv61JY7wAsYReTHYXHP6eOh2o5w84wvGeuDe6VhrLbcW', NULL, NULL, NULL, '2025-06-14 17:03:42', '2025-06-14 17:03:42'),
(38, NULL, 'tmuller', 'ggaylord@yahoo.com', '$2y$12$w25ARF0AJr2dtiICUXawh.B/Vsu0OtAnHncD0s9DsO3dy3cubPjTa', NULL, NULL, NULL, '2025-06-14 17:03:43', '2025-06-14 17:03:43'),
(39, NULL, 'alison.reilly', 'treva.kris@daniel.com', '$2y$12$W2jp5/XXnO9tywytyAFo8uLM.pSIepkRzj9/.3J/IXwzjonAELp8y', NULL, NULL, NULL, '2025-06-14 17:03:44', '2025-06-14 17:03:44'),
(40, NULL, 'kiehn.christina', 'stanford84@kihn.com', '$2y$12$H49SUCpYmQnHmhsSupJekOnla7yZrRHpnH6uMbkVR9/V36k4JgUNu', NULL, NULL, NULL, '2025-06-14 17:03:44', '2025-06-14 17:03:44'),
(41, NULL, 'monty.mohr', 'upton.savanna@heller.com', '$2y$12$Jk47BW/pDnb6fR3F630vf.phY1WtFxfX.G1x/SEeJkNqVPFHJWNxu', NULL, NULL, NULL, '2025-06-14 17:03:45', '2025-06-14 17:03:45'),
(42, NULL, 'ccarter', 'mozelle98@strosin.net', '$2y$12$r.T0ZNiVHYS48MHHz.YNb.aN.oP1BlC5MlEhIwaHrp7gvQbr0BEy6', NULL, NULL, NULL, '2025-06-14 17:03:45', '2025-06-14 17:03:45'),
(43, NULL, 'qhowe', 'flatley.felton@yahoo.com', '$2y$12$vS3HQYi36frHxM7.SHlqsOraiqeeY0EQv1D/515S.4FrCaZy.vXBi', NULL, NULL, NULL, '2025-06-14 17:03:45', '2025-06-14 17:03:45'),
(44, NULL, 'johnathon32', 'dayne.walsh@hotmail.com', '$2y$12$/uADQppTuBvVB35OwGs1MOfpSgMfZFdfvRcQTW7wG4kN./.axGVTC', NULL, NULL, NULL, '2025-06-14 17:03:46', '2025-06-14 17:03:46'),
(45, NULL, 'ziemann.lessie', 'stan.boyer@schultz.biz', '$2y$12$viTcu5LBLJ/dsx/Srxdmvu6ooHnlF8RUpTfWt/9.x671PIPCtzLRO', NULL, NULL, NULL, '2025-06-14 17:03:46', '2025-06-14 17:03:46'),
(46, NULL, 'kcollier', 'elsa07@price.biz', '$2y$12$2FXvitdgcy4AJN49UONZKe/eFQ.s1G7i4nlSOx/0owaM2ztFJPoZa', NULL, NULL, NULL, '2025-06-14 17:03:47', '2025-06-14 17:03:47'),
(47, NULL, 'pfeffer.andrew', 'lambert.zieme@klein.com', '$2y$12$J0AkUqmGAnJ7iEVw2nh9Y.drKV3udDMnYv4QYU7CJ2NVatZACV1ZW', NULL, NULL, NULL, '2025-06-14 17:03:47', '2025-06-14 17:03:47'),
(48, NULL, 'boyer.fritz', 'hegmann.dandre@johnston.com', '$2y$12$BplB7tA30z40iMcixigdzObBsuableVHOGAQoFyNOvna7ktKW5HXO', NULL, NULL, NULL, '2025-06-14 17:03:48', '2025-06-14 17:03:48'),
(49, NULL, 'runolfsdottir.colten', 'arnoldo.tremblay@doyle.com', '$2y$12$5R19JQQ7Ff0WsIaVMK/VeuS7SS0iyfo22g3k9p.irObFxyBateR6e', NULL, NULL, NULL, '2025-06-14 17:03:48', '2025-06-14 17:03:48'),
(50, NULL, 'javon.prosacco', 'gibson.shannon@gmail.com', '$2y$12$iA3mcu5UdrmPtQfoCiRcF.vfnE0DZoHLJYhuw1jvkzpIfdsScWG4O', NULL, NULL, NULL, '2025-06-14 17:03:48', '2025-06-14 17:03:48'),
(51, NULL, 'green.ellen', 'gonzalo.labadie@hotmail.com', '$2y$12$kZnLH6z1jjWVOzdjI2u14ezotcgbYsUZCTDyduw.FfJXGwfCJxZ8.', NULL, NULL, NULL, '2025-06-14 17:03:49', '2025-06-14 17:03:49'),
(52, NULL, 'ybarrows', 'juliana50@gmail.com', '$2y$12$.kPkrCtblMa3xU5DC8c2t.L6IoOQImjbHxKwBNQqCYGsHMHmxVKQK', NULL, NULL, NULL, '2025-06-14 17:03:49', '2025-06-14 17:03:49'),
(53, NULL, 'elemke', 'alvis.dicki@hotmail.com', '$2y$12$34dmtaXOV1xQ1lXmn05IUOOqZSF.Y.ti2ajfG8mmb35KJhTVSOxTC', NULL, NULL, NULL, '2025-06-14 17:03:50', '2025-06-14 17:03:50'),
(54, NULL, 'walter.agustin', 'francisca.ratke@effertz.com', '$2y$12$p/3O616lE5K7QQzoS1DsaepUszbKb3Q/TT.bqs2Rp0JXR31VFpFpy', NULL, NULL, NULL, '2025-06-14 17:03:50', '2025-06-14 17:03:50'),
(55, NULL, 'feil.dayton', 'fritsch.isaac@yahoo.com', '$2y$12$HMzI4iXVyOgB4JSwLSOpZ.QaSHcsUvCj1lViC5oBv2TuQwAKIwqwq', NULL, NULL, NULL, '2025-06-14 17:03:51', '2025-06-14 17:03:51'),
(56, NULL, 'laverne.funk', 'schiller.mervin@kiehn.com', '$2y$12$RrysfMEU3NrbsoT.CJYqNenYr0Mt2PtAkHgR0uFITLFrr61QEtihS', NULL, NULL, NULL, '2025-06-14 17:03:51', '2025-06-14 17:03:51'),
(57, NULL, 'rosanna.flatley', 'lcrona@stamm.com', '$2y$12$L11CkVE35QBG7w7BScpdEemxrFvm8/0GyE/7tW0qjCw9VN4aYxdya', NULL, NULL, NULL, '2025-06-14 17:03:52', '2025-06-14 17:03:52'),
(58, NULL, 'godfrey.bergstrom', 'emuller@renner.com', '$2y$12$UjVTZ1IrJmpEnrmTpXWWd.bYhUEve0QgVdf2w1ICaIv1Km6zXwnRW', NULL, NULL, NULL, '2025-06-14 17:03:52', '2025-06-14 17:03:52'),
(59, NULL, 'andre86', 'bergstrom.jackie@hotmail.com', '$2y$12$cZRNsgslt43sKkgHVTMgnemkLbtuNvKZnmf73YgexuCEfyu.PUevG', NULL, NULL, NULL, '2025-06-14 17:03:53', '2025-06-14 17:03:53'),
(60, NULL, 'adams.sierra', 'janet.metz@klocko.net', '$2y$12$.RxogpBrZakWjlPtmi6fge5WorwyqRtfVsyTeFVpswiuQoRcq1VH2', NULL, NULL, NULL, '2025-06-14 17:03:53', '2025-06-14 17:03:53'),
(61, NULL, 'javonte70', 'muller.hailie@yahoo.com', '$2y$12$2SXy21sAkOFZZGkgrbQsDOExmS7.XxUI4OZ22A8.HxbfIKzk5BaUS', NULL, NULL, NULL, '2025-06-14 17:03:53', '2025-06-14 17:03:53'),
(62, NULL, 'ollie21', 'price.price@carroll.com', '$2y$12$yH68bDxuSOKKmLsYaN3yj.8g8XFYqCWU/Hc/kRTJSaXvfictLNEl6', NULL, NULL, NULL, '2025-06-14 17:03:54', '2025-06-14 17:03:54'),
(63, NULL, 'zelma.torphy', 'monahan.emily@koepp.org', '$2y$12$cVzZmxvtpMG1.4WQM1hoFOywE0TAzTVBRqnMnY26jjf8v6mN1sJX2', NULL, NULL, NULL, '2025-06-14 17:03:54', '2025-06-14 17:03:54'),
(64, NULL, 'cormier.riley', 'hilbert62@macejkovic.com', '$2y$12$RHDpd7ZSzKSBpmTxIb3BVeLgkkE.U8ZLNsOsitbq7LTXOO21dhRv6', NULL, NULL, NULL, '2025-06-14 17:03:55', '2025-06-14 17:03:55'),
(65, NULL, 'bailey69', 'keeling.jaycee@ortiz.info', '$2y$12$Kg9ff5FZPTuMz6LMYKnEBe/hPq18vJcFEQB.mHKHkOIBhPJcyycJm', NULL, NULL, NULL, '2025-06-14 17:03:55', '2025-06-14 17:03:55'),
(66, NULL, 'arlene69', 'howe.ernest@hotmail.com', '$2y$12$eAn.u.5of609NJibT551fe98iIM9jU3Zed..e4yghia7.lrWtvQr6', NULL, NULL, NULL, '2025-06-14 17:03:56', '2025-06-14 17:03:56'),
(67, NULL, 'horace.rodriguez', 'maida28@schamberger.biz', '$2y$12$4xSdVz43mObY9I8AOLlfjekTldNTEqMGlkEuPvB7BlQrcJE/SF/xa', NULL, NULL, NULL, '2025-06-14 17:03:56', '2025-06-14 17:03:56'),
(68, NULL, 'rosina.jast', 'west.dayna@hotmail.com', '$2y$12$AmpCbT32jpbSYluJvvodguxFb47BQr0trwzV7WF.UDYsEoKzzZhAK', NULL, NULL, NULL, '2025-06-14 17:03:56', '2025-06-14 17:03:56'),
(69, NULL, 'stefan.stark', 'regan90@goldner.info', '$2y$12$a9IGt8AiLER/SF3wMCMrl.DvD5QIO2Bh9QkXYHzxGSQHgWnpN2LLO', NULL, NULL, NULL, '2025-06-14 17:03:57', '2025-06-14 17:03:57'),
(70, NULL, 'fadel.hank', 'garnett72@hane.com', '$2y$12$oXogWOEn0QpNbu2cm1FMX.cJmAX4aAmlVu3UHFfD7rlMWhdJqcBlC', NULL, NULL, NULL, '2025-06-14 17:03:57', '2025-06-14 17:03:57'),
(71, NULL, 'angie.hartmann', 'kirstin83@champlin.org', '$2y$12$sZYbRW3fgF2/6DnO7bHvv.H3HNSgVWsYL5EOv6x/slBp3HF0Rrh1G', NULL, NULL, NULL, '2025-06-14 17:03:58', '2025-06-14 17:03:58'),
(72, NULL, 'zabbott', 'glover.betty@daniel.net', '$2y$12$qPoM6yN1LiRUSwdtXQ9lY.bjRuy8LVMeTWmbqsCcODMNyiKNzB2F2', NULL, NULL, NULL, '2025-06-14 17:03:58', '2025-06-14 17:03:58'),
(73, NULL, 'funk.kacey', 'kayley.weimann@howe.com', '$2y$12$tdq1kCyCJdW.nXyPDt0guOTbuYDdYzYbXt0Y1ipZHGYFbWn4rXCjG', NULL, NULL, NULL, '2025-06-14 17:03:59', '2025-06-14 17:03:59'),
(74, NULL, 'edd31', 'padberg.madonna@gmail.com', '$2y$12$gBSKVfyHUKWXiJXHZYI0SOnxXEbBPqv.oUCYuLgjOmvf7XPUbhH52', NULL, NULL, NULL, '2025-06-14 17:03:59', '2025-06-14 17:03:59'),
(75, NULL, 'nicolas.pete', 'wiza.eldridge@greenholt.com', '$2y$12$9b0mrFMxZeFUEbl18j1m3eUqi6BGQ1YpoPE/cXtIoKFJL2ADzEWCa', NULL, NULL, NULL, '2025-06-14 17:03:59', '2025-06-14 17:03:59'),
(76, NULL, 'mann.myrtle', 'dkunde@hotmail.com', '$2y$12$cJdRbocFuTbrJTi5K4TEounY5xTrzXFN4rqebk/UWC4E7ef23xMSW', NULL, NULL, NULL, '2025-06-14 17:04:00', '2025-06-14 17:04:00'),
(77, NULL, 'wrussel', 'ziemann.zoila@gmail.com', '$2y$12$qupflQcjneKQC2RpuBI1weRXynKvJSqpxQHLjMGyt1aRtmOH..ch.', NULL, NULL, NULL, '2025-06-14 17:04:00', '2025-06-14 17:04:00'),
(78, NULL, 'jschroeder', 'ywillms@bergnaum.info', '$2y$12$SN/7ecyK/gBWePTKa40LHe6YlKSh5Og2nFr6Ql1f5CEXf4HRVDXzy', NULL, NULL, NULL, '2025-06-14 17:04:01', '2025-06-14 17:04:01'),
(79, NULL, 'angie.ondricka', 'langworth.joelle@hotmail.com', '$2y$12$mkqwpS8pSZldwQyP2UY3xOwhzMsTDcUn8OKhHaI/3D2Ctz0xYFMjW', NULL, NULL, NULL, '2025-06-14 17:04:01', '2025-06-14 17:04:01'),
(80, NULL, 'dayne.ullrich', 'farrell.georgette@gmail.com', '$2y$12$aLBP1RGKuJiAwWycRAIsyub50Wam6gHC0sACPP9fQN0yMwKD3w25K', NULL, NULL, NULL, '2025-06-14 17:04:02', '2025-06-14 17:04:02'),
(81, NULL, 'qflatley', 'anissa01@gmail.com', '$2y$12$SnFK3xg32QffyRsvrIzfVedKrDJMHKjDK/LHiM8mdHXF3TjHMZgUm', NULL, NULL, NULL, '2025-06-14 17:04:02', '2025-06-14 17:04:02'),
(82, NULL, 'kory.conroy', 'kling.billy@bogan.com', '$2y$12$gzjmH3tQKZMGcAqezvonTe.1n0b1vSW8XE.e8bHuJTDFLmOt.PBaW', NULL, NULL, NULL, '2025-06-14 17:04:03', '2025-06-14 17:04:03'),
(83, NULL, 'gkeebler', 'israel.collier@gleichner.org', '$2y$12$rUITcikkWYu/sToWlLZUFusHe5LbJNhdczm1kLscKrwkG.Z98q5Y6', NULL, NULL, NULL, '2025-06-14 17:04:03', '2025-06-14 17:04:03'),
(84, NULL, 'brigitte03', 'glover.domenic@labadie.info', '$2y$12$a43aPrv64Mv51FzS.r2lk.GFq7Ye2FAt9eq5fvWY8XqL/izV7oE1a', NULL, NULL, NULL, '2025-06-14 17:04:03', '2025-06-14 17:04:03'),
(85, NULL, 'vbins', 'elisabeth13@bogisich.org', '$2y$12$rLW1SKrCZTbjokmQ2YgAvud591g8bT6KwLk0Ibv.fcKE/QP8.OlZa', NULL, NULL, NULL, '2025-06-14 17:04:04', '2025-06-14 17:04:04'),
(86, NULL, 'leannon.colleen', 'estrosin@morar.com', '$2y$12$vqAyK3yp3RV9tnFPDtpc3ONxjzpYan21XTgzv7oMAjHdMPNezWhVu', NULL, NULL, NULL, '2025-06-14 17:04:04', '2025-06-14 17:04:04'),
(87, NULL, 'nbergstrom', 'usimonis@yahoo.com', '$2y$12$H5VGoXBCu/AWxT/NFBsB.ej59O3U5ymHsEkRhGfFJXxeYteuRcGoG', NULL, NULL, NULL, '2025-06-14 17:04:05', '2025-06-14 17:04:05'),
(88, NULL, 'shannon33', 'maria.cartwright@hotmail.com', '$2y$12$3YoxHz9/b6fujnYu3iYF1.3a0YvsJROI9uHOu7TrhM1j9Z/RMZsKe', NULL, NULL, NULL, '2025-06-14 17:04:05', '2025-06-14 17:04:05'),
(89, NULL, 'fausto.ullrich', 'oswift@gmail.com', '$2y$12$3dL7RqbmMXkYiBiTEFKOceKzbvofMnF93eO2yf.5TXIUVmxGC9nlq', NULL, NULL, NULL, '2025-06-14 17:04:06', '2025-06-14 17:04:06'),
(90, NULL, 'hsenger', 'tavares.eichmann@hotmail.com', '$2y$12$n5UWOePBy3p5UsfZspoeYucSbXusk9XKozogF6WODFEPSKQ5KfX72', NULL, NULL, NULL, '2025-06-14 17:04:06', '2025-06-14 17:04:06'),
(91, NULL, 'bauch.cierra', 'jonatan.hill@towne.com', '$2y$12$ygqPTliQ707ZpZ.lBNvqxeMykA4SB25vReMMjQtFTG.Bo2xF0vo2S', NULL, NULL, NULL, '2025-06-14 17:04:06', '2025-06-14 17:04:06'),
(92, NULL, 'jacquelyn30', 'spinka.sabryna@schoen.com', '$2y$12$Wu6qo6nyF7R0bJUnFHphpOg8iTIx./rCep4o/WQz404sTSVXfXIlu', NULL, NULL, NULL, '2025-06-14 17:04:07', '2025-06-14 17:04:07'),
(93, NULL, 'langworth.rosie', 'goyette.carmine@hickle.com', '$2y$12$gAtDMAyIB6Z66eT9R0T1vOe18OpVfMLKEyXmq7DWRfBss7vKus7g6', NULL, NULL, NULL, '2025-06-14 17:04:07', '2025-06-14 17:04:07'),
(94, NULL, 'reese.kuhn', 'jennie60@yundt.com', '$2y$12$hT1n6quNyZuMXHLNJ3Ad5uxUZyy3OCj63MypqNlcPeLZnJPk9iKPy', NULL, NULL, NULL, '2025-06-14 17:04:08', '2025-06-14 17:04:08'),
(95, NULL, 'lind.eda', 'shanelle90@schulist.info', '$2y$12$5U3UdvJ0pxhtNjSzkrgItOV50ORi4K4sKr9RaWnXQmaSon.m1Hbna', NULL, NULL, NULL, '2025-06-14 17:04:08', '2025-06-14 17:04:08'),
(96, NULL, 'buckridge.jon', 'yasmeen86@hotmail.com', '$2y$12$mg50mKi3zaNeAZ2.qoEmfuwZVPVQbPRtP84A8xI2zom0RJn/svt9C', NULL, NULL, NULL, '2025-06-14 17:04:09', '2025-06-14 17:04:09'),
(97, NULL, 'volkman.amina', 'dorris02@yahoo.com', '$2y$12$G898DQ0AVRk8ykSwyQcfjOyxo7WG5Q4KshC4Ch2pKx/gabCOiC8/.', NULL, NULL, NULL, '2025-06-14 17:04:09', '2025-06-14 17:04:09'),
(98, NULL, 'joanny66', 'ztorp@hotmail.com', '$2y$12$C7DFoMCa2fDeBrzjrE3.X.20ZZMDFZvZ17plfWaYwnWhp47auvEHO', NULL, NULL, NULL, '2025-06-14 17:04:10', '2025-06-14 17:04:10'),
(99, NULL, 'keara.erdman', 'gdurgan@hotmail.com', '$2y$12$FJ3SLZ.NEyrXJk2Km5qTDOkxibgUwmfRMXlzpG7z7kuAEutQErXle', NULL, NULL, NULL, '2025-06-14 17:04:10', '2025-06-14 17:04:10'),
(100, NULL, 'antonietta46', 'hardy78@johns.com', '$2y$12$q5A1y6IucWuZRSaKfsQlquWcxie7/CSFPEk3WQDPs/10MMk6XVApm', NULL, NULL, NULL, '2025-06-14 17:04:10', '2025-06-14 17:04:10'),
(101, NULL, 'erich.berge', 'willie49@gmail.com', '$2y$12$OaAsCsNV2XJD40he7SkBVOMEjsR7jxYYTHCt3cqsSMhcNIxpYbipO', NULL, NULL, NULL, '2025-06-14 17:04:11', '2025-06-14 17:04:11');

-- --------------------------------------------------------

--
-- Table structure for table `utils`
--

CREATE TABLE `utils` (
  `id` bigint UNSIGNED NOT NULL,
  `kebijakan_privasi` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `bantuan` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `syarat_ketentuan` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `utils`
--

INSERT INTO `utils` (`id`, `kebijakan_privasi`, `bantuan`, `syarat_ketentuan`, `created_at`, `updated_at`) VALUES
(1, '**KEBIJAKAN PRIVASI APLIKASI HUSNA EDU PAY**  \n*(Dikeluarkan oleh Yayasan Al Husna)*\n\n**Terakhir Diperbarui:** 17 Juni 2025\n\n---\n\n### **1. Pengenalan**\nHusna Edu Pay (\"Aplikasi\") adalah platform pembayaran digital yang dikelola oleh Yayasan Al Husna untuk memfasilitasi transaksi keuangan terkait layanan pendidikan di lingkungan yayasan. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, melindungi, dan mengungkapkan informasi pribadi pengguna. Dengan menggunakan Aplikasi, Anda menyetujui praktik yang dijelaskan dalam dokumen ini.\n\n---\n\n### **2. Informasi yang Kami Kumpulkan**\n#### a. Data Pribadi\n- Identitas: Nama lengkap, NISN/NIP, tempat/tanggal lahir\n- Kontak: Nomor telepon, alamat email, alamat rumah\n- Keuangan: Riwayat transaksi, metode pembayaran (tidak termasuk penyimpanan data kartu kredit)\n- Akademik: Kelas/jurusan, nama wali (untuk siswa), status keanggotaan yayasan\n\n#### b. Data Otomatis\n- Perangkat: Model perangkat, versi OS, alamat IP\n- Penggunaan: Log aktivitas, riwayat transaksi, preferensi bahasa\n- Lokasi: Perkiraan lokasi berbasis IP (hanya untuk deteksi keamanan)\n\n---\n\n### **3. Tujuan Penggunaan Data**\n| Jenis Data | Tujuan Penggunaan | Legal Basis |\n|------------|-------------------|-------------|\n| Identitas | Verifikasi akun, personalisasi layanan | Kontrak |\n| Keuangan | Pemrosesan pembayaran, invoice, refund | Kontrak |\n| Akademik | Penagihan otomatis, notifikasi tagihan | Kepentingan Legitim |\n| Perangkat | Pencegahan penipuan, optimasi aplikasi | Kepentingan Saham |\n| Lokasi | Deteksi transaksi mencurigakan | Perlindungan Vital |\n\n---\n\n### **4. Pembagian Data**\nData Anda **TIDAK AKAN** diperjualbelikan. Pembagian hanya dilakukan kepada:\n- **Institusi Pendidikan**: Sekolah di bawah Yayasan Al Husna untuk keperluan administrasi\n- **Penyedia Pembayaran**: Bank/Fintech mitra (contoh: BCA, BRI, OVO) hanya untuk pemrosesan transaksi\n- **Otoritas Hukum**: Jika diminta berdasarkan peraturan perundangan (contoh: perintah pengadilan)\n- **Vendor Teknis**: Penyedia layanan IT dengan perjanjian kerahasiaan ketat (contoh: hosting server)\n\n---\n\n### **5. Keamanan Data**\n#### Protokol Perlindungan:\n- **Enkripsi**: AES-256 untuk data diam (at-rest), TLS 1.3 untuk data transit\n- **Autentikasi**: 2FA (Two-Factor Authentication) untuk akses akun\n- **Audit**: Pemindaian kerentanan bulanan dan pentest tahunan\n- **Pelatihan**: Sertifikasi ISO 27001 untuk staf penanganan data\n\n#### Praktik Operasional:\n- Penyimpanan data di server lokal Indonesia\n- Penghancuran dokumen fisik dengan mesin shredder\n- Pembatasan akses data berbasis peran (RBAC)\n\n---\n\n### **6. Hak Pengguna**\nAnda berhak untuk:\n- Mengakses dan menduplikasi data pribadi Anda\n- Memperbarui data yang tidak akurat\n- Menghapus akun (*right to be forgotten*)\n- Menarik persetujuan pemrosesan data\n- Melaporkan keluhan ke DPO kami di dpo@alhusna.id\n\n---\n\n### **7. Retensi Data**\n| Jenis Data | Masa Penyimpanan |\n|------------|------------------|\n| Data Transaksi | 10 tahun (sesuai UU Perpajakan) |\n| Data Profil Pengguna | Selama akun aktif + 1 tahun setelah nonaktif |\n| Log Sistem | 6 bulan |\n| Data Anak Dibawah 13 Tahun | Hanya dengan persetujuan orang tua/wali |\n\n---\n\n### **8. Kebijakan Anak**\n- Aplikasi tidak ditujukan untuk pengguna di bawah 13 tahun\n- Transaksi oleh siswa wajib mendapat persetujuan orang tua/wali\n- Konten iklan disaring sesuai rating P3 (Pengawasan Orang Tua)\n\n---\n\n### **9. Perubahan Kebijakan**\nPerubahan signifikan akan:\n- Diumumkan melalui notifikasi dalam aplikasi 30 hari sebelumnya\n- Meminta persetujuan ulang jika terkait pemrosesan data baru\n- Versi terdokumentasi tersedia di [privacy.alhusna.id/husna-edu-pay]()\n\n---\n\n### **10. Kontak**\nPenanggung Jawab Perlindungan Data (DPO):  \n**Yayasan Al Husna**  \nAlamat: Jl. Pendidikan No. 123, Jakarta Selatan, Indonesia  \nEmail: privacy@alhusna.id  \nTelepon: +62 21 7890 1234 (Senin-Jumat, 09.00-16.00 WIB)\n\n---\n\n*Kebijakan ini mengacu pada:*\n- Undang-Undang No. 27 Tahun 2022 tentang Perlindungan Data Pribadi\n- Permendikbud No. 20 Tahun 2016 tentang Pengelolaan Data Pendidikan\n- Standar PCI DSS untuk Transaksi Keuangan\n\n**Dokumen ini berlaku efektif sejak tanggal diterbitkan**  \n*© 2025 Yayasan Al Husna. Hak Cipta Dilindungi.*', '# 📘 Panduan Penggunaan Aplikasi **Husna Edu Pay**\n\nSelamat datang di **Husna Edu Pay**, aplikasi resmi dari **Yayasan Al Husna** yang memudahkan Anda dalam melakukan pembayaran tagihan pendidikan secara cepat, aman, dan transparan.\n\n---\n\n## 📱 1. **Instalasi Aplikasi**\nAplikasi **Husna Edu Pay** dapat digunakan di perangkat Android.\n\n### Cara menginstal:\n1. Buka tautan yang diberikan oleh pihak sekolah atau yayasan.\n2. Unduh file aplikasi (APK).\n3. Izinkan pemasangan dari sumber tidak dikenal (jika diminta).\n4. Jalankan instalasi hingga selesai.\n\n---\n\n## 🔐 2. **Login ke Aplikasi**\n### Langkah-langkah:\n1. Buka aplikasi **Husna Edu Pay**.\n2. Masukkan **Nomor Induk Siswa (NIS)** atau **username** yang diberikan oleh pihak sekolah.\n3. Masukkan **kata sandi** (password).\n4. Tap tombol **\"Masuk\"**.\n\n> 🔒 **Catatan**: Jika Anda lupa password, hubungi pihak administrasi sekolah untuk reset akun.\n\n---\n\n## 📋 3. **Melihat Daftar Tagihan**\nSetelah berhasil login, Anda akan diarahkan ke halaman **Beranda**.\n\n### Di halaman ini Anda bisa melihat:\n- ✅ Nama siswa dan kelas\n- 📅 Tagihan yang masih aktif\n- 💰 Jumlah nominal tagihan\n- 🟡 Status tagihan: **Belum dibayar / Lunas / Pending**\n- 📄 Riwayat pembayaran sebelumnya\n\n---\n\n## 💳 4. **Melakukan Pembayaran**\n### Langkah-langkah:\n1. Pilih salah satu tagihan yang ingin dibayar.\n2. Tekan tombol **\"Bayar Sekarang\"**.\n3. Pilih metode pembayaran yang tersedia:\n   - **Transfer Bank (Virtual Account)**\n   - **E-Wallet (OVO, GoPay, ShopeePay, dll)**\n4. Sistem akan menampilkan instruksi dan nomor pembayaran.\n5. Lakukan pembayaran sesuai nominal.\n6. Setelah selesai, status akan berubah otomatis menjadi **Pending** dan kemudian **Lunas** setelah diverifikasi.\n\n> ⚠️ **Penting**: Jangan mengubah nominal pembayaran agar verifikasi sistem berjalan otomatis.\n\n---\n\n## 🧾 5. **Melihat Detail Transaksi**\n1. Buka menu **Transaksi** atau **Riwayat**.\n2. Klik salah satu transaksi untuk melihat:\n   - Waktu dan tanggal transaksi\n   - Metode pembayaran\n   - Nominal\n   - Status (Lunas / Pending / Gagal)\n   - Bukti transaksi (jika tersedia)\n\n---\n\n## 📢 6. **Menerima Notifikasi Pembayaran**\n- Setelah pembayaran berhasil diverifikasi, Anda akan menerima **notifikasi push** yang berisi:\n  - Nama tagihan\n  - Status pembayaran\n  - Waktu update terakhir\n\nPastikan Anda **mengaktifkan izin notifikasi** untuk aplikasi Husna Edu Pay di perangkat Anda.\n\n---\n\n## 📞 7. **Bantuan & Dukungan**\nJika Anda mengalami kendala seperti:\n- Tidak bisa login\n- Tagihan tidak muncul\n- Pembayaran tidak terverifikasi\n- Aplikasi error\n\n### Silakan hubungi:\n📧 Email: admin@alhusna.sch.id  \n📱 WA/Telepon: 0812-xxxx-xxxx  \n🏫 Admin Keuangan Sekolah Al Husna\n\n---\n\n## ✅ Tips Penggunaan Aman\n- Gunakan akun resmi yang diberikan sekolah.\n- Jangan membagikan username dan password ke orang lain.\n- Selalu periksa nominal dan instruksi pembayaran dengan teliti.\n- Gunakan perangkat pribadi untuk akses aplikasi.\n\n---\n\nTerima kasih telah menggunakan **Husna Edu Pay**. Semoga aplikasi ini mempermudah proses administrasi dan pembayaran di lingkungan Yayasan Al Husna. 🙏', '# Syarat & Ketentuan Penggunaan Aplikasi Husna Edu Pay\n\n**Terakhir diperbarui: 12 Juni 2025**\n\nSelamat datang di aplikasi **Husna Edu Pay**, aplikasi resmi milik **Yayasan Al Husna** yang digunakan untuk mempermudah pembayaran berbagai tagihan pendidikan seperti SPP, buku, kegiatan sekolah, dan lainnya.\n\nDengan mengakses dan menggunakan aplikasi ini, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui seluruh **Syarat & Ketentuan** berikut ini. Jika Anda tidak menyetujui sebagian atau seluruh ketentuan ini, Anda tidak diperkenankan menggunakan aplikasi ini.\n\n---\n\n## 1. Definisi\n\n- **Aplikasi**: Aplikasi mobile atau web bernama **Husna Edu Pay** milik Yayasan Al Husna.\n- **Yayasan**: Yayasan Al Husna, sebagai pemilik dan pengelola resmi aplikasi.\n- **Pengguna**: Individu atau wali murid yang telah mendaftar dan menggunakan aplikasi ini.\n- **Tagihan**: Kewajiban pembayaran biaya pendidikan, administrasi, atau kewajiban lainnya yang ditentukan oleh Yayasan.\n\n---\n\n## 2. Pendaftaran & Akun Pengguna\n\n1. Pengguna wajib mengisi data dengan benar dan jujur saat mendaftar.\n2. Pengguna bertanggung jawab untuk menjaga kerahasiaan akun dan kata sandi.\n3. Yayasan berhak membekukan atau menghapus akun jika ditemukan aktivitas mencurigakan atau pelanggaran aturan.\n\n---\n\n## 3. Fitur & Layanan\n\nAplikasi **Husna Edu Pay** menyediakan layanan:\n\n- Informasi tagihan siswa (SPP, buku, kegiatan, dll)\n- Riwayat transaksi pembayaran\n- Fitur notifikasi pengingat pembayaran\n- Download bukti pembayaran\n- Komunikasi antara wali murid dan pihak yayasan\n\n---\n\n## 4. Pembayaran\n\n1. Semua transaksi pembayaran dilakukan melalui metode yang tersedia di aplikasi (transfer bank, e-wallet, atau QRIS).\n2. Pembayaran dianggap sah setelah sistem kami menerima konfirmasi pembayaran dari mitra pembayaran.\n3. Bukti pembayaran akan dikirim dan dapat diakses melalui aplikasi.\n4. Yayasan tidak bertanggung jawab atas kesalahan penginputan nominal atau data oleh pengguna.\n\n---\n\n## 5. Kebijakan Pengembalian Dana\n\n1. Dana yang sudah dibayarkan **tidak dapat dikembalikan**, kecuali terdapat kesalahan dari sistem aplikasi atau pihak Yayasan.\n2. Pengajuan refund harus disertai bukti transaksi dan akan ditinjau oleh pihak Yayasan dalam waktu maksimal 14 hari kerja.\n\n---\n\n## 6. Privasi & Keamanan Data\n\n1. Data pengguna (nama, email, data anak, transaksi, dll) disimpan dengan aman dan hanya digunakan untuk keperluan operasional aplikasi.\n2. Data tidak akan dibagikan ke pihak ketiga tanpa persetujuan pengguna, kecuali diwajibkan oleh hukum.\n\n---\n\n## 7. Hak Kekayaan Intelektual\n\nSeluruh konten, desain, logo, dan sistem dalam aplikasi ini adalah milik Yayasan Al Husna dan dilindungi oleh hukum hak cipta yang berlaku di Indonesia.\n\n---\n\n## 8. Larangan\n\nPengguna dilarang untuk:\n\n- Menyalahgunakan aplikasi untuk tujuan ilegal.\n- Mengakses atau mencoba mengakses data pengguna lain.\n- Menyebarkan informasi palsu atau menyesatkan dalam aplikasi.\n- Meretas, menyalin, atau menduplikasi aplikasi tanpa izin.\n\n---\n\n## 9. Perubahan Syarat & Ketentuan\n\nYayasan Al Husna berhak melakukan perubahan terhadap Syarat & Ketentuan ini tanpa pemberitahuan sebelumnya. Perubahan akan ditampilkan pada halaman ini dan berlaku segera setelah dipublikasikan.\n\n---\n\n## 10. Kontak & Bantuan\n\nJika Anda memiliki pertanyaan atau membutuhkan bantuan, silakan hubungi kami:\n\n- **Email**: admin@alhusna.or.id  \n- **Telp / WhatsApp**: 08xxxxxxxxxx  \n- **Alamat**: Yayasan Al Husna, Jl. Pendidikan No. 123, Jakarta  \n\n---\n\nDengan menggunakan aplikasi **Husna Edu Pay**, Anda dianggap telah membaca, memahami, dan menyetujui seluruh Syarat & Ketentuan di atas.\n\n**Terima kasih atas kepercayaan Anda.**', '2025-06-17 16:49:55', '2025-06-18 09:09:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `expo_push_tokens`
--
ALTER TABLE `expo_push_tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `history_pembayarans`
--
ALTER TABLE `history_pembayarans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `history_pembayarans_user_id_foreign` (`user_id`),
  ADD KEY `history_pembayarans_tagihan_id_foreign` (`tagihan_id`),
  ADD KEY `history_pembayarans_transaksi_id_foreign` (`transaksi_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `metode_pembayarans`
--
ALTER TABLE `metode_pembayarans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `notifikasis`
--
ALTER TABLE `notifikasis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifikasis_user_id_foreign` (`user_id`),
  ADD KEY `notifikasis_tagihan_id_foreign` (`tagihan_id`),
  ADD KEY `notifikasis_transaksi_id_foreign` (`transaksi_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `tagihans`
--
ALTER TABLE `tagihans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tagihans_user_id_foreign` (`user_id`);

--
-- Indexes for table `transaksis`
--
ALTER TABLE `transaksis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaksis_tagihan_id_foreign` (`tagihan_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `utils`
--
ALTER TABLE `utils`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `expo_push_tokens`
--
ALTER TABLE `expo_push_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `history_pembayarans`
--
ALTER TABLE `history_pembayarans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `metode_pembayarans`
--
ALTER TABLE `metode_pembayarans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `notifikasis`
--
ALTER TABLE `notifikasis`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tagihans`
--
ALTER TABLE `tagihans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1228;

--
-- AUTO_INCREMENT for table `transaksis`
--
ALTER TABLE `transaksis`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT for table `utils`
--
ALTER TABLE `utils`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `history_pembayarans`
--
ALTER TABLE `history_pembayarans`
  ADD CONSTRAINT `history_pembayarans_tagihan_id_foreign` FOREIGN KEY (`tagihan_id`) REFERENCES `tagihans` (`id`),
  ADD CONSTRAINT `history_pembayarans_transaksi_id_foreign` FOREIGN KEY (`transaksi_id`) REFERENCES `transaksis` (`id`),
  ADD CONSTRAINT `history_pembayarans_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifikasis`
--
ALTER TABLE `notifikasis`
  ADD CONSTRAINT `notifikasis_tagihan_id_foreign` FOREIGN KEY (`tagihan_id`) REFERENCES `tagihans` (`id`),
  ADD CONSTRAINT `notifikasis_transaksi_id_foreign` FOREIGN KEY (`transaksi_id`) REFERENCES `transaksis` (`id`),
  ADD CONSTRAINT `notifikasis_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tagihans`
--
ALTER TABLE `tagihans`
  ADD CONSTRAINT `tagihans_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `transaksis`
--
ALTER TABLE `transaksis`
  ADD CONSTRAINT `transaksis_tagihan_id_foreign` FOREIGN KEY (`tagihan_id`) REFERENCES `tagihans` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
