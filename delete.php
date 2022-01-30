<?php
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed", true, 405);
    exit;
}
$inputJSON = file_get_contents('php://input');
$file_name = "data.json";
$persos = [];

if (file_exists($file_name)) {

    $persos = json_decode(file_get_contents($file_name), true);
    $i = 0;
    foreach ($persos as $data) {
        echo ($data);

        if ($inputJSON == $data["id"]) {
            unset($persos[$i]);
        }
        $i++;
    }
}

file_put_contents($file_name, json_encode(array_values($persos)));
