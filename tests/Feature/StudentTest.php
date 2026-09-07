<?php

namespace Tests\Feature;

use App\Models\Student;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class StudentTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_guests_are_redirected_from_students_index(): void
    {
        $response = $this->get(route('students.index'));
        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_user_can_view_student_list(): void
    {
        Student::factory(5)->create();

        $response = $this->actingAs($this->user)->get(route('students.index'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('students/index')
            ->has('students.data', 5)
            ->has('filters')
        );
    }

    public function test_student_search_filters_results(): void
    {
        $target = Student::factory()->create([
            'student_number' => '2026-9999',
            'first_name' => 'Alexander',
            'last_name' => 'Hamilton',
            'email' => 'alexander@hamilton.test',
        ]);

        Student::factory()->create([
            'student_number' => '2026-1111',
            'first_name' => 'George',
            'last_name' => 'Washington',
            'email' => 'george@washington.test',
        ]);

        // Search by student number
        $response = $this->actingAs($this->user)->get('/students?search=2026-9999');
        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('students/index')
            ->has('students.data', 1)
            ->where('students.data.0.student_number', '2026-9999')
        );

        // Search by first name
        $response = $this->actingAs($this->user)->get('/students?search=Alexander');
        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('students/index')
            ->has('students.data', 1)
            ->where('students.data.0.first_name', 'Alexander')
        );

        // Search by email
        $response = $this->actingAs($this->user)->get('/students?search=alexander@hamilton.test');
        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('students/index')
            ->has('students.data', 1)
        );
    }

    public function test_student_list_is_paginated(): void
    {
        Student::factory(15)->create();

        $response = $this->actingAs($this->user)->get(route('students.index'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('students/index')
            ->has('students.data', 10)
            ->where('students.total', 15)
            ->where('students.current_page', 1)
            ->where('students.last_page', 2)
        );
    }

    public function test_add_student_page_renders(): void
    {
        $response = $this->actingAs($this->user)->get(route('students.create'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('students/create')
        );
    }

    public function test_student_can_be_created(): void
    {
        $studentData = [
            'student_number' => '2026-5555',
            'first_name' => 'Juan',
            'middle_name' => 'Santos',
            'last_name' => 'Dela Cruz',
            'gender' => 'Male',
            'birth_date' => '2005-04-12',
            'address' => '123 Rizal Street, Manila',
            'phone' => '09171234567',
            'email' => 'juan.delacruz@example.com',
            'guardian_name' => 'Maria Dela Cruz',
            'guardian_phone' => '09187654321',
            'status' => 'Active',
        ];

        $response = $this->actingAs($this->user)->post(route('students.store'), $studentData);

        $response->assertRedirect(route('students.index'));
        $response->assertSessionHas('success', 'Student added successfully.');

        $this->assertDatabaseHas('students', [
            'student_number' => '2026-5555',
            'first_name' => 'Juan',
            'last_name' => 'Dela Cruz',
            'guardian_name' => 'Maria Dela Cruz',
        ]);
    }

    public function test_student_creation_validation_fails_on_missing_required_fields(): void
    {
        $response = $this->actingAs($this->user)->post(route('students.store'), []);

        $response->assertSessionHasErrors([
            'student_number',
            'first_name',
            'last_name',
            'gender',
            'birth_date',
            'guardian_name',
            'guardian_phone',
            'status',
        ]);
    }

    public function test_duplicate_student_number_is_rejected(): void
    {
        Student::factory()->create([
            'student_number' => '2026-0001',
        ]);

        $response = $this->actingAs($this->user)->post(route('students.store'), [
            'student_number' => '2026-0001',
            'first_name' => 'Duplicate',
            'last_name' => 'Test',
            'gender' => 'Male',
            'birth_date' => '2005-01-01',
            'guardian_name' => 'Test Guardian',
            'guardian_phone' => '09123456789',
            'status' => 'Active',
        ]);

        $response->assertSessionHasErrors(['student_number']);
    }

    public function test_view_student_page_renders_student_details(): void
    {
        $student = Student::factory()->create([
            'student_number' => '2026-7777',
            'first_name' => 'Maria',
            'last_name' => 'Clara',
        ]);

        $response = $this->actingAs($this->user)->get(route('students.show', $student));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('students/show')
            ->where('student.id', $student->id)
            ->where('student.student_number', '2026-7777')
            ->where('student.first_name', 'Maria')
        );
    }

    public function test_edit_student_page_renders_prefilled_student_details(): void
    {
        $student = Student::factory()->create();

        $response = $this->actingAs($this->user)->get(route('students.edit', $student));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('students/edit')
            ->where('student.id', $student->id)
            ->where('student.student_number', $student->student_number)
        );
    }

    public function test_student_can_be_updated_keeping_same_student_number(): void
    {
        $student = Student::factory()->create([
            'student_number' => '2026-0099',
            'first_name' => 'Original',
            'status' => 'Active',
        ]);

        $response = $this->actingAs($this->user)->put(route('students.update', $student), [
            'student_number' => '2026-0099', // unchanged
            'first_name' => 'Updated',
            'middle_name' => $student->middle_name,
            'last_name' => $student->last_name,
            'gender' => $student->gender,
            'birth_date' => $student->birth_date->format('Y-m-d'),
            'address' => 'Updated Address',
            'phone' => '09999999999',
            'email' => 'updated@example.com',
            'guardian_name' => $student->guardian_name,
            'guardian_phone' => $student->guardian_phone,
            'status' => 'Inactive',
        ]);

        $response->assertRedirect(route('students.index'));
        $response->assertSessionHas('success', 'Student updated successfully.');

        $this->assertDatabaseHas('students', [
            'id' => $student->id,
            'first_name' => 'Updated',
            'status' => 'Inactive',
            'address' => 'Updated Address',
        ]);
    }

    public function test_student_can_be_deleted(): void
    {
        $student = Student::factory()->create();

        $response = $this->actingAs($this->user)->delete(route('students.destroy', $student));

        $response->assertRedirect(route('students.index'));
        $response->assertSessionHas('success', 'Student deleted successfully.');

        $this->assertDatabaseMissing('students', [
            'id' => $student->id,
        ]);
    }

    public function test_dashboard_displays_real_total_students_and_recent_students(): void
    {
        Student::factory(7)->create();

        $response = $this->actingAs($this->user)->get(route('dashboard'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->where('totalStudents', 7)
            ->has('recentStudents', 5)
        );
    }
}

