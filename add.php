<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed", true, 405);
    exit;
}
$inputJSON = file_get_contents('php://input');

// if (!$inputJSON['id'] == "" || !$inputJSON['name'] == "" || !$inputJSON['house'] == "" || !$inputJSON['imageSrc'] = "") {
//     header($_SERVER["SERVER_PROTOCOL"] . " 204 No Content", true, 204);
//     exit;
// }
$perso = json_decode($inputJSON, TRUE);

$file_name = "data.json";
$persos = [];
$hasduplicate = false;
if (file_exists($file_name)) {
    $persos = json_decode(file_get_contents($file_name), true);
    foreach ($persos as $data) {
        if ($perso["id"] == $data["id"]) {
            $hasduplicate = true;
            header($_SERVER["SERVER_PROTOCOL"] . " 409 conflict", true, 409);
            exit;
        }
    }
    if ($hasduplicate == false) {
        array_push($persos, $perso);
        file_put_contents($file_name, json_encode($persos));
    }
}
