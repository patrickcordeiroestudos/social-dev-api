import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Campaigns } from "./campaign.entities"
import { Homeless } from "./homeless.entity"
import { Exclude } from "class-transformer"

@Entity('institutions')
export class Institutions{

  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @Column({length:50})
  name: string
  
  @Column({length:18, unique:true})
  cnpj: string
  
  @Column({length:150})
  address: string
  
  @Column({length:11})
  phone: string

  @Column({length:60, unique:true})
  email: string

  @Column({default:true})
  isActive:boolean

  @Column({length:60})
  @Exclude()
  password: string

  @OneToMany(() => Homeless, (homeless) => homeless.institution)
  homeless: Homeless[]

  @OneToMany(() => Campaigns, campaigns => campaigns.institution)
  campaigns:Campaigns[]

}