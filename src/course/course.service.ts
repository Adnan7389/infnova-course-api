import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
    private courses: Course[] = [];

    async create(createCourseDto: CreateCourseDto): Promise<Course> {
        const newCourse: Course = {
            id: randomUUID(),
            ...createCourseDto,
        };

        this.courses.push(newCourse);
        return newCourse;
    }

    async findAll(): Promise<Course[]> {
        return this.courses;
    }

    async findOne(id: string): Promise<Course> {
        const course = this.courses.find((c) => c.id === id);

        if (!course) {
            throw new NotFoundException(`Course with ID ${id} not found`);
        }

        return course;
    }

    async update(
        id: string,
        updateCourseDto: UpdateCourseDto,
    ): Promise<Course> {
        const course = await this.findOne(id);

        // Explicit field updates (defensive coding)
        if (updateCourseDto.title !== undefined) {
            course.title = updateCourseDto.title;
        }

        if (updateCourseDto.level !== undefined) {
            course.level = updateCourseDto.level;
        }

        if (updateCourseDto.durationInWeeks !== undefined) {
            course.durationInWeeks = updateCourseDto.durationInWeeks;
        }

        return course;
    }

    async remove(id: string): Promise<Course> {
        const course = await this.findOne(id);

        this.courses = this.courses.filter((c) => c.id !== id);

        return course;
    }
}