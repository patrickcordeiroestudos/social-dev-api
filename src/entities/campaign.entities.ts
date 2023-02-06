import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import { Address } from './address.entities'
import { Institutions } from './institutions.entity'

@Entity("campaigns")
export class Campaigns {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ length: 100 })
    name: string


    @Column({ default: true })
    isActive: boolean

    @CreateDateColumn()
    date_creation: Date

    @UpdateDateColumn()
    date_update: Date

    @OneToMany(() => Address, address => address.campaigns)
    address: Address[]

    @ManyToOne(() => Institutions)
    institution: Institutions

}