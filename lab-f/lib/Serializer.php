<?php
namespace App;

use App\Encoder\EncoderInterface;
use App\Encoder\CsvEncoder;
use App\Encoder\SsvEncoder;
use App\Encoder\TsvEncoder;
use App\Encoder\JsonEncoder;
use App\Encoder\YamlEncoder;

class Serializer {
    /** @var EncoderInterface[] */
    private array $encoders = [];

    public function __construct() {
        $this->encoders[] = new CsvEncoder();
        $this->encoders[] = new SsvEncoder();
        $this->encoders[] = new TsvEncoder();
        $this->encoders[] = new JsonEncoder();
        $this->encoders[] = new YamlEncoder();
    }

    public function convert(string $data, string $inputFormat, string $outputFormat): string {
        $inputFormat = strtolower($inputFormat);
        $outputFormat = strtolower($outputFormat);

        if ($inputFormat === $outputFormat) {
            return $data;
        }

        $inputEncoder = $this->findEncoder($inputFormat);
        $outputEncoder = $this->findEncoder($outputFormat);

        if (!$inputEncoder || !$outputEncoder) {
            return "Błąd: Nieobsługiwany format danych.";
        }

        $arrayData = $inputEncoder->decode($data);
        if (empty($arrayData)) {
            return "Błąd: Brak danych wejściowych lub błąd parsowania.";
        }

        return $outputEncoder->encode($arrayData);
    }

    private function findEncoder(string $format): ?EncoderInterface {
        foreach ($this->encoders as $encoder) {
            if ($encoder->supports($format)) {
                return $encoder;
            }
        }
        return null;
    }
}
