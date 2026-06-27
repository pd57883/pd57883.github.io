<?php

$data = [
    'name' => 'Dawid Puchta',
    'index' => '57883',
    'date' => date(DATE_ATOM),
];

$yaml = yaml_emit($data);

echo $yaml;
