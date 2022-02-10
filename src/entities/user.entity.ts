import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('m_users')
export default class UserEntity {
    @PrimaryColumn({ type: 'varchar', length: 20 })
        username: string;

    @Column({ type: 'varchar', length: 100 })
        password: string;

    @Column({ type: 'varchar', length: 150 })
        full_name: string;

    @Column({ type: 'varchar', length: 50 })
        email: string;

    @Column({ type: 'varchar', length: 32 })
        phone: string;

    @Column({ type: 'datetime' })
        last_login_date: string;

    @Column({ type: 'varchar', length: 100 })
        avatar: string;

    @Column({ type: 'tinyint' })
        is_active: number;

    @Column({ type: 'varchar', length: 20 })
        created_user: string;

    @CreateDateColumn({ type: 'datetime' })
        created_date: string;

    @Column({ type: 'varchar', length: 20 })
        updated_user: string;

    @UpdateDateColumn({ type: 'datetime' })
        updated_date: string;

}
