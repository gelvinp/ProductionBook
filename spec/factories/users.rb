FactoryBot.define do
  factory :user_modify, class: "User" do
    password { "Passw0rd" }
    auth { 2 }
    id { 2222 }
  end

  factory :user_upload, class: "User" do
    password { "Passw0rd" }
    auth { 1 }
    id { 1111 }
  end

  factory :user_read, class: "User" do
    password { "Passw0rd" }
    auth { 0 }
    id { 0000 }
  end
end

def log_in
  @user_modify = create(:user_modify)
  post "/api/login", params: { id: @user_modify.id, password: 'Passw0rd' }
  cookies['token'] = response.cookies['token']
end

def log_in_read
  @user_read = create(:user_read)
  post "/api/login", params: { id: @user_read.id, password: 'Passw0rd' }
  cookies['token'] = response.cookies['token']
end

def log_in_upload
  @user_upload = create(:user_upload)
  post "/api/login", params: { id: @user_upload.id, password: 'Passw0rd' }
  cookies['token'] = response.cookies['token']
end
