import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Theater {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ unique: true })
  name: string;

  @Column()
  capacity: number;
}
