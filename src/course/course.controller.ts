import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
} from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@ApiTags('courses')
@Controller('courses')
export class CourseController {
    constructor(private readonly courseService: CourseService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new course' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'The course has been successfully created.',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid payload.',
    })
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() createCourseDto: CreateCourseDto,
    ): Promise<Course> {
        return this.courseService.create(createCourseDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all courses' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'List of all courses.',
    })
    async findAll(): Promise<Course[]> {
        return this.courseService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific course by ID' })
    @ApiParam({ name: 'id', description: 'Course ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The course details.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Course not found.',
    })
    async findOne(@Param('id') id: string): Promise<Course> {
        return this.courseService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Partially update a specific course by ID' })
    @ApiParam({ name: 'id', description: 'Course ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The course has been successfully updated.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Course not found.',
    })
    async update(
        @Param('id') id: string,
        @Body() updateCourseDto: UpdateCourseDto,
    ): Promise<Course> {
        return this.courseService.update(id, updateCourseDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a specific course by ID' })
    @ApiParam({ name: 'id', description: 'Course ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The course has been successfully deleted.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Course not found.',
    })
    async remove(@Param('id') id: string): Promise<Course> {
        return this.courseService.remove(id);
    }
}