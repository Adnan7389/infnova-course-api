import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsInt, Min } from 'class-validator';

export enum CourseLevel {
    BEGINNER = 'Beginner',
    INTERMEDIATE = 'Intermediate',
    ADVANCED = 'Advanced',
}

export class CreateCourseDto {
    @ApiProperty({
        example: 'Intro to HTML',
        description: 'The title of the course',
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        enum: CourseLevel,
        description: 'The level of the course',
    })
    @IsEnum(CourseLevel)
    level: CourseLevel;

    @ApiProperty({
        example: 4,
        description: 'Duration of the course in weeks',
    })
    @IsInt()
    @Min(1)
    durationInWeeks: number;
}