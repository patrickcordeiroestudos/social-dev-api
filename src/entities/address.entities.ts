import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Campaigns } from "./campaign.entities";

@Entity("Address")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  road: string;

  @Column({ length: 50, nullable: true })
  number: string;

  @Column({ length: 120, nullable: true })
  complement: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 2 })
  state: string;

  @ManyToOne(() => Campaigns, { eager: true })
  @JoinColumn()
  campaigns: Campaigns;
}
