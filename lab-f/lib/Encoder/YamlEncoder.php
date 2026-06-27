<?php
namespace App\Encoder;

class YamlEncoder implements EncoderInterface {
    public function supports(string $format): bool {
        return in_array(strtolower($format), ['yaml', 'yml']);
    }

    public function decode(string $data): array {
        if (!function_exists('yaml_parse')) return [];
        $decoded = yaml_parse(trim($data));
        return is_array($decoded) ? $decoded : [];
    }

    public function encode(array $data): string {
        if (!function_exists('yaml_emit')) {
            return "Błąd: Rozszerzenie PECL yaml nie jest załadowane.";
        }
        return yaml_emit($data);
    }
}
