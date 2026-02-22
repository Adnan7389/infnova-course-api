import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseLevel } from './dto/create-course.dto';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseService],
    }).compile();

    service = module.get<CourseService>(CourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a course with an auto-generated id', async () => {
      const dto = { title: 'Test 1', level: CourseLevel.BEGINNER, durationInWeeks: 2 };
      const result = await service.create(dto);

      expect(result).toMatchObject(dto);
      expect(result.id).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      expect(await service.findAll()).toEqual([]);
      await service.create({ title: 'Test 1', level: CourseLevel.BEGINNER, durationInWeeks: 2 });
      const results = await service.findAll();

      expect(results.length).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return a course by id', async () => {
      const created = await service.create({ title: 'Test 1', level: CourseLevel.BEGINNER, durationInWeeks: 2 });
      const found = await service.findOne(created.id);

      expect(found).toEqual(created);
    });

    it('should throw NotFoundException if id does not exist', async () => {
      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return a course', async () => {
      const created = await service.create({ title: 'Test 1', level: CourseLevel.BEGINNER, durationInWeeks: 2 });
      const updated = await service.update(created.id, { title: 'Updated Test' });

      expect(updated.title).toBe('Updated Test');
      expect(updated.level).toBe(CourseLevel.BEGINNER); // Remains unchanged
    });

    it('should throw NotFoundException if updating non-existing course', async () => {
      await expect(service.update('999', { title: 'Nope' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove and return the deleted course', async () => {
      const created = await service.create({ title: 'Test 1', level: CourseLevel.BEGINNER, durationInWeeks: 2 });
      const removed = await service.remove(created.id);

      expect(removed).toEqual(created);
      expect((await service.findAll()).length).toBe(0);
    });

    it('should throw NotFoundException if removing non-existing course', async () => {
      await expect(service.remove('999')).rejects.toThrow(NotFoundException);
    });
  });
});
