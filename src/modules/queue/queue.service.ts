import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientService } from 'src/modules/patient/patient.service';
import { DoctorEntity } from '../doctors/doctors.entity';
import { QueuePositionService } from './positions/queuePositions.service';
import { QueueEntity } from './queue.entity';
import { QueueRepository } from './queue.repository';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(QueueRepository)
    private readonly queueRepository: QueueRepository,
    private readonly positionService: QueuePositionService,
    private readonly patientService: PatientService,
  ) {}

  async getIdOfFirst(queueId: number): Promise<number> {
    return this.positionService.getIdOfFirst(queueId);
  }

  async deleteCurrentAndGetNewFirst(queueId: number): Promise<number> {
    return this.positionService.deleteCurrentAndGetNewFirst(queueId);
  }

  async add(queueId: number, patientId: number): Promise<void> {
    const queue = await this.queueRepository.findById(queueId);

    if (!queue) {
      throw new NotFoundException('Queue with the given id does not exist');
    }

    await this.positionService.add(queue, patientId);
  }

  async create(doctor: DoctorEntity): Promise<QueueEntity> {
    return this.queueRepository.add(doctor);
  }
}