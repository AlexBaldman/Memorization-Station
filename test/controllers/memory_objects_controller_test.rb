require 'test_helper'

class MemoryObjectsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @memory_object = memory_objects(:one)
  end

  test "should get index" do
    get memory_objects_url, as: :json
    assert_response :success
  end

  test "should create memory_object" do
    assert_difference('MemoryObject.count') do
      post memory_objects_url, params: { memory_object: { chart_id: @memory_object.chart_id, description: @memory_object.description, image_url: @memory_object.image_url, initials: @memory_object.initials, name: @memory_object.name, number: @memory_object.number, type: @memory_object.type, user_id: @memory_object.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show memory_object" do
    get memory_object_url(@memory_object), as: :json
    assert_response :success
  end

  test "should update memory_object" do
    patch memory_object_url(@memory_object), params: { memory_object: { chart_id: @memory_object.chart_id, description: @memory_object.description, image_url: @memory_object.image_url, initials: @memory_object.initials, name: @memory_object.name, number: @memory_object.number, type: @memory_object.type, user_id: @memory_object.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy memory_object" do
    assert_difference('MemoryObject.count', -1) do
      delete memory_object_url(@memory_object), as: :json
    end

    assert_response 204
  end
end
