<?php

require_once __DIR__ . '/autoload.php';

use App\Serializer;

$inputData = $_COOKIE['input_data'] ?? '';
$inputFormat = $_COOKIE['input_format'] ?? 'csv';
$outputFormat = $_COOKIE['output_format'] ?? 'json';
$outputData = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputData = $_POST['input_data'] ?? '';
    $inputFormat = $_POST['input_format'] ?? 'csv';
    $outputFormat = $_POST['output_format'] ?? 'json';

    setcookie('input_data', $inputData, time() + (86400 * 30), "/");
    setcookie('input_format', $inputFormat, time() + (86400 * 30), "/");
    setcookie('output_format', $outputFormat, time() + (86400 * 30), "/");

    if (!empty(trim($inputData))) {
        $serializer = new Serializer();
        $outputData = $serializer->convert($inputData, $inputFormat, $outputFormat);
    }
}

require __DIR__ . '/templates/layout.php';
