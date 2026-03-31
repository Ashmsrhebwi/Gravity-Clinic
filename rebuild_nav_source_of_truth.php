<?php
require 'Backend-New/vendor/autoload.php';
$app = require_once 'Backend-New/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Treatment;
use App\Models\NavbarItem;
use App\Models\NavbarSection;

echo "--- RESETTING DENTAL & HAIR NAV SECTIONS ---\n";

// 1. Ensure Treatments exist with correct IDs/Slugs
$treatments = [
    'dental-implant' => ['en' => 'Dental Implant', 'ar' => 'زراعة الأسنان'],
    'hollywood-smile' => ['en' => 'Hollywood Smile', 'ar' => 'ابتسامة هوليود'],
    'male-hair-transplant' => ['en' => 'Male Hair Transplant', 'ar' => 'زراعة الشعر للرجال'],
    'female-hair-transplant' => ['en' => 'Female Hair Transplant', 'ar' => 'زراعة الشعر للنساء'],
    'beard-moustache-transplant' => ['en' => 'Beard & Moustache Transplant', 'ar' => 'زراعة الذقن والشارب'],
    'eyebrow-transplant' => ['en' => 'Eyebrow Transplant', 'ar' => 'زراعة الحواجب'],
];

$treatmentIds = [];
foreach ($treatments as $slug => $labels) {
    $t = Treatment::updateOrCreate(
        ['slug' => $slug],
        [
            'title' => [
                'en' => $labels['en'],
                'ar' => $labels['ar'],
                'fr' => $labels['en'], // fallback
                'ru' => $labels['en']  // fallback
            ],
            'category' => str_contains($slug, 'hair') || str_contains($slug, 'beard') || str_contains($slug, 'eyebrow') ? 'Hair Transplant' : 'Dental',
            'description' => ['en' => 'Professional ' . $labels['en']],
            'is_active' => true
        ]
    );
    $treatmentIds[$slug] = $t->id;
}

// 2. Clear Existing Sections to avoid duplicates
NavbarSection::whereIn('label->en', ['Dental', 'Hair Transplant'])->each(function($s) {
    $s->items()->delete();
    $s->delete();
});

// 3. Recreate Dental Section
$dental = NavbarSection::create([
    'label' => ['en' => 'Dental', 'ar' => 'علاجات الأسنان', 'fr' => 'Dentaire', 'ru' => 'Стоматология'],
    'order' => 1,
    'is_active' => true
]);

NavbarItem::create([
    'navbar_section_id' => $dental->id,
    'treatment_id' => $treatmentIds['dental-implant'],
    'custom_url' => '/treatment/dental-implant',
    'label' => ['en' => 'Dental Implant', 'ar' => 'زراعة الأسنان', 'fr' => 'Implant Dentaire', 'ru' => 'Зубной имплантат'],
    'order' => 0,
    'is_active' => true
]);

NavbarItem::create([
    'navbar_section_id' => $dental->id,
    'treatment_id' => $treatmentIds['hollywood-smile'],
    'custom_url' => '/treatment/hollywood-smile',
    'label' => ['en' => 'Hollywood Smile', 'ar' => 'ابتسامة هوليود', 'fr' => 'Sourire Hollywoodien', 'ru' => 'Голливудская улыбка'],
    'order' => 1,
    'is_active' => true
]);

// 4. Recreate Hair Transplant Section
$hair = NavbarSection::create([
    'label' => ['en' => 'Hair Transplant', 'ar' => 'زراعة الشعر', 'fr' => 'Greffe de Cheveux', 'ru' => 'Пересадка волос'],
    'order' => 2,
    'is_active' => true
]);

$hairItems = [
    'male-hair-transplant' => ['en' => 'Male Hair Transplant', 'ar' => 'زراعة الشعر للرجال'],
    'female-hair-transplant' => ['en' => 'Female Hair Transplant', 'ar' => 'زراعة الشعر للنساء'],
    'beard-moustache-transplant' => ['en' => 'Beard & Moustache Transplant', 'ar' => 'زراعة الذقن والشارب'],
    'eyebrow-transplant' => ['en' => 'Eyebrow Transplant', 'ar' => 'زراعة الحواجب'],
];

$order = 0;
foreach ($hairItems as $slug => $labels) {
    NavbarItem::create([
        'navbar_section_id' => $hair->id,
        'treatment_id' => $treatmentIds[$slug],
        'custom_url' => '/treatment/' . $slug,
        'label' => [
            'en' => $labels['en'],
            'ar' => $labels['ar'],
            'fr' => $labels['en'],
            'ru' => $labels['en']
        ],
        'order' => $order++,
        'is_active' => true
    ]);
}

echo "--- SUCCESS: NAV DATA REBUILT AT SOURCE OF TRUTH ---\n";
