<?php
require 'Backend-New/vendor/autoload.php';
$app = require_once 'Backend-New/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Treatment;
use App\Models\NavbarItem;
use App\Models\NavbarSection;

$treatmentsData = [
    ['title' => ['en' => 'Dental Implant', 'ar' => 'زراعة الأسنان', 'fr' => 'Implant Dentaire', 'ru' => 'Зубной имплантат'], 'slug' => 'dental-implant', 'category' => 'Dental'],
    ['title' => ['en' => 'Hollywood Smile', 'ar' => 'ابتسامة هوليود', 'fr' => 'Sourire Hollywoodien', 'ru' => 'Голливудская улыбка'], 'slug' => 'hollywood-smile', 'category' => 'Dental'],
    ['title' => ['en' => 'Male Hair Transplant', 'ar' => 'زراعة الشعر للرجال', 'fr' => 'Greffe de Cheveux Homme', 'ru' => 'Пересадка волос у мужчин'], 'slug' => 'male-hair-transplant', 'category' => 'Hair Transplant'],
    ['title' => ['en' => 'Female Hair Transplant', 'ar' => 'زراعة الشعر للنساء', 'fr' => 'Greffe de Cheveux Femme', 'ru' => 'Пересадка волос у женщин'], 'slug' => 'female-hair-transplant', 'category' => 'Hair Transplant'],
    ['title' => ['en' => 'Beard & Moustache Transplant', 'ar' => 'زراعة الذقن والشارب', 'fr' => 'Greffe de Barbe et Moustache', 'ru' => 'Пересадка бороды и усов'], 'slug' => 'beard-moustache-transplant', 'category' => 'Hair Transplant'],
    ['title' => ['en' => 'Eyebrow Transplant', 'ar' => 'زراعة الحواجب', 'fr' => 'Greffe de Sourcils', 'ru' => 'Пересадка бровей'], 'slug' => 'eyebrow-transplant', 'category' => 'Hair Transplant'],
];

echo "Updating Treatments...\n";
foreach ($treatmentsData as $data) {
    Treatment::updateOrCreate(
        ['slug' => $data['slug']],
        [
            'title' => $data['title'],
            'category' => $data['category'],
            'description' => ['en' => 'Professional ' . $data['title']['en'] . ' at Gravity Clinic.'],
            'is_active' => true
        ]
    );
    echo "Done: " . $data['slug'] . "\n";
}

echo "\nUpdating Navbar Items...\n";
$mapping = [
    'Dental Implant' => '/treatment/dental-implant',
    'Hollywood Smile' => '/treatment/hollywood-smile',
    'Male Hair Transplant' => '/treatment/male-hair-transplant',
    'Female Hair Transplant' => '/treatment/female-hair-transplant',
    'Beard & Moustache Transplant' => '/treatment/beard-moustache-transplant',
    'Eyebrow Transplant' => '/treatment/eyebrow-transplant',
];

foreach ($mapping as $label => $path) {
    // Find item where label['en'] matches
    $items = NavbarItem::all();
    foreach ($items as $item) {
        if (($item->label['en'] ?? '') === $label) {
            $item->update(['custom_url' => $path]);
            echo "Updated Nav Item: $label -> $path\n";
        }
    }
}

echo "\nCleaning up Sections (Ensuring they are dropdowns)...\n";
$dentalSection = NavbarSection::where('label->en', 'Dental')->first();
if ($dentalSection) {
    $dentalSection->update(['custom_url' => null]);
}
$hairSection = NavbarSection::where('label->en', 'Hair Transplant')->first();
if ($hairSection) {
    $hairSection->update(['custom_url' => null]);
}
