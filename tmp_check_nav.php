<?php
require 'Backend-New/vendor/autoload.php';
$app = require_once 'Backend-New/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$items = \App\Models\NavbarItem::all();
$sections = \App\Models\NavbarSection::all();

echo "SECTIONS:\n";
foreach($sections as $s) {
    echo "ID: {$s->id} | Label: " . json_encode($s->label) . " | Order: {$s->order}\n";
}

echo "\nITEMS:\n";
foreach($items as $i) {
    echo "ID: {$i->id} | Label: " . json_encode($i->label) . " | URL: {$i->custom_url} | Section ID: {$i->navbar_section_id}\n";
}
