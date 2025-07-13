<?php
header('Content-Type: text/plain');

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['tasks']) && is_array($data['tasks'])) {

    $tasksString = implode(PHP_EOL, $data['tasks']);
    
    $file = 'tasks.txt';
    if (file_put_contents($file, $tasksString) !== false) {
        echo 'Tasks saved successfully!';
    } else {
        echo 'Error saving tasks to file.';
    }
} else {
    echo 'No tasks received or invalid data format.';
}
?>