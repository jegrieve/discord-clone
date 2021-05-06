class User < ApplicationRecord
    has_secure_password
    has_many :messages
    has_many :servers
    
    validates :email, presence: true, uniqueness: true
    validates :username, presence: true, uniqueness: true
    validates :password_digest, presence: true
end
