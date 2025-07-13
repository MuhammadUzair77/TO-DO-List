<?php
header('Content-Type: application/json');

$file = 'tasks.txt';
$tasks = [];

if (file_exists($file)) {
    $content = file_get_contents($file);
    if ($content !== false) {
        $tasks = array_filter(explode(PHP_EOL, $content), function($line) {
            return trim($line) !== '';
        });
        $tasks = array_values($tasks);
    }
}

echo json_encode($tasks);
?>