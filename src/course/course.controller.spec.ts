import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseLevel } from './dto/create-course.dto';

describe('CourseController', () => {
  let controller: CourseController;

  // 1️⃣ Create a fake/mocked version of the CourseService
  const mockCourseService = {
    create: jest.fn(dto => ({ id: '1', ...dto })),
    findAll: jest.fn(() => [{ id: '1', title: 'Test', level: CourseLevel.BEGINNER, durationInWeeks: 2 }]),
    findOne: jest.fn(id => ({ id, title: 'Test', level: CourseLevel.BEGINNER, durationInWeeks: 2 })),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    remove: jest.fn(id => ({ id, title: 'Test', level: CourseLevel.BEGINNER, durationInWeeks: 2 })),
  };

  beforeEach(async () => {
    // 2️⃣ Create a testing module (Nest's DI container)
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        // 3️⃣ Replace real service with mocked service
        {
          provide: CourseService,
          useValue: mockCourseService,
        },
      ],
    }).compile();

    // 4️⃣ Get an instance of the controller from the DI container
    controller = module.get<CourseController>(CourseController);
  });

  it('should be defined', () => {
    // 5️⃣ Basic test: controller exists
    expect(controller).toBeDefined();
  });

  it('should create a course', async () => {
    // 6️⃣ Test create endpoint
    const dto = { title: 'New Course', level: CourseLevel.BEGINNER, durationInWeeks: 3 };
    const result = await controller.create(dto);

    // 7️⃣ Expect the result to match mocked service return
    expect(result).toEqual({ id: '1', ...dto });

    // 8️⃣ Expect the service method to be called with correct arguments
    expect(mockCourseService.create).toHaveBeenCalledWith(dto);
  });

  it('should return all courses', async () => {
    const result = await controller.findAll();

    expect(result.length).toBe(1);
    expect(mockCourseService.findAll).toHaveBeenCalled();
  });

  it('should return a single course by id', async () => {
    const result = await controller.findOne('1');

    expect(result.id).toBe('1');
    expect(mockCourseService.findOne).toHaveBeenCalledWith('1');
  });

  it('should update a course', async () => {
    const dto = { title: 'Updated Title' };
    const result = await controller.update('1', dto);

    expect(result).toEqual({ id: '1', ...dto });
    expect(mockCourseService.update).toHaveBeenCalledWith('1', dto);
  });

  it('should remove a course', async () => {
    const result = await controller.remove('1');

    expect(result.id).toBe('1');
    expect(mockCourseService.remove).toHaveBeenCalledWith('1');
  });
});