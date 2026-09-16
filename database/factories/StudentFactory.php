<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Student>
 */
class StudentFactory extends Factory
{
    protected static int $studentSequence = 1;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gender = fake()->randomElement(['Male', 'Female']);
        $maleFirstNames = ['Juan', 'Jose', 'Mark', 'Angelo', 'John', 'Joshua', 'Christian', 'Daniel', 'Miguel', 'Carlo', 'Gabriel', 'Rafael'];
        $femaleFirstNames = ['Maria', 'Christine', 'Princess', 'Nicole', 'Patricia', 'Angelica', 'Bea', 'Alyssa', 'Camille', 'Jasmine', 'Katherine'];
        $middleNames = ['Santos', 'Reyes', 'Garcia', 'Ramos', 'Mendoza', 'Flores', 'Cruz', 'Bautista', 'Gonzales', 'Rivera', 'Castro'];
        $lastNames = ['Dela Cruz', 'Santos', 'Reyes', 'Garcia', 'Ramos', 'Mendoza', 'Flores', 'Bautista', 'Gonzales', 'Rivera', 'Aquino', 'Tolentino'];

        $firstName = $gender === 'Male'
            ? fake()->randomElement($maleFirstNames)
            : fake()->randomElement($femaleFirstNames);
        $middleName = fake()->randomElement($middleNames);
        $lastName = fake()->randomElement($lastNames);

        $studentNumber = sprintf('2026-%04d', static::$studentSequence++);

        $cities = ['Manila', 'Quezon City', 'Makati', 'Taguig', 'Pasig', 'Caloocan', 'Cebu City', 'Davao City'];
        $city = fake()->randomElement($cities);

        $guardianFirstNames = ['Maria', 'Elena', 'Teresa', 'Rosa', 'Roberto', 'Antonio', 'Eduardo', 'Ricardo'];
        $guardianName = fake()->randomElement($guardianFirstNames).' '.$lastName;

        return [
            'student_number' => $studentNumber,
            'first_name' => $firstName,
            'middle_name' => $middleName,
            'last_name' => $lastName,
            'gender' => $gender,
            'birth_date' => fake()->dateTimeBetween('-24 years', '-17 years')->format('Y-m-d'),
            'course' => fake()->randomElement([
                'BS Information Technology',
                'BS Computer Science',
                'BS Information Systems',
                'BS Business Administration',
                'BS Hospitality Management',
            ]),
            'year_level' => fake()->randomElement(['1st Year', '2nd Year', '3rd Year', '4th Year']),
            'address' => fake()->buildingNumber().' '.fake()->streetName().', '.$city,
            'phone' => '09'.fake()->numerify('#########'),
            'email' => strtolower($firstName.'.'.str_replace(' ', '', $lastName).fake()->numerify('##')).'@example.com',
            'guardian_name' => $guardianName,
            'guardian_phone' => '09'.fake()->numerify('#########'),
            'status' => fake()->randomElement(['Active', 'Active', 'Active', 'Inactive']),
        ];
    }
}
