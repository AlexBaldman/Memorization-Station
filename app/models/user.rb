class User < ApplicationRecord
    has_many :charts, dependent: :destroy
    has_many :memory_objects, dependent: :destroy
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, length: { minimum: 6 }
  
  end
  