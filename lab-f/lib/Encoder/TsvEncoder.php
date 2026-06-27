<?php
namespace App\Encoder;

class TsvEncoder implements EncoderInterface {
    public function supports(string $format): bool {
        return strtolower($format) === 'tsv';
    }

    public function decode(string $data): array {
        $lines = array_filter(explode("\n", str_replace("\r", "", trim($data))));
        if (empty($lines)) return [];

        $headers = str_getcsv(array_shift($lines), "\t");
        $result = [];

        foreach ($lines as $line) {
            $row = str_getcsv($line, "\t");
            if (count($row) === count($headers)) {
                $result[] = array_combine($headers, $row);
            }
        }
        return $result;
    }

    public function encode(array $data): string {
        if (empty($data)) return '';
        $output = fopen('php://temp', 'r+');

        fputcsv($output, array_keys(reset($data)), "\t");
        foreach ($data as $row) {
            fputcsv($output, $row, "\t");
        }

        rewind($output);
        $csv = stream_get_contents($output);
        fclose($output);
        return rtrim($csv, "\r\n");
    }
}
