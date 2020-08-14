class User < ApplicationRecord
    has_secure_password
    has_many :charts, dependent: :destroy
    has_many :memory_objects, dependent: :destroy
  
    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, length: { minimum: 6 }
  
  end
  