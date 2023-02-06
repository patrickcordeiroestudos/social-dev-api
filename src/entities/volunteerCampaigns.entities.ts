import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Volunteers from "./volunteers.entities";

@Entity()
class VolunteerCampaigns {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Volunteers, { eager: true })
  @JoinColumn()
  volunteer_id: Volunteers
}

export default VolunteerCampaigns