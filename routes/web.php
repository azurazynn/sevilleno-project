<?php

use App\Http\Controllers\StudentController;
use App\Models\Student;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'totalStudents' => Student::count(),
            'activeStudents' => Student::where('status', 'Active')->count(),
            'recentStudents' => Student::latest()->take(5)->get(),
        ]);
    })->name('dashboard');

    Route::resource('students', StudentController::class);
});

require __DIR__.'/settings.php';
