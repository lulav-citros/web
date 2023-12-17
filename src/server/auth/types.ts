import { JWTPayload } from 'jose';

export interface AuthJwtPayload extends JWTPayload {
    user_id: string;
    user_name: string;
    role: string;
    organization_id: string;
    organization_type: string;
    domain_prefix: string;
}
