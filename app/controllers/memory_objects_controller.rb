class MemoryObjectsController < ApplicationController
  before_action :set_memory_object, only: [:show, :update, :destroy]

  # GET /memory_objects
  def index
    @memory_objects = MemoryObject.all

    render json: @memory_objects
    puts @memory_objects
  end

  # GET /memory_objects/1
  def show
    render json: @memory_object
  end

  # POST /memory_objects
  def create
    @memory_object = MemoryObject.new(memory_object_params)
    # @memory_object.user = @current_user

    if @memory_object.save
      render json: @memory_object, status: :created, location: @memory_object
    else
      render json: @memory_object.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /memory_objects/1
  def update
    if @memory_object.update(memory_object_params)
      render json: @memory_object
    else
      render json: @memory_object.errors, status: :unprocessable_entity
    end
  end

  # DELETE /memory_objects/1
  def destroy
    @memory_object.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_memory_object
      @memory_object = MemoryObject.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def memory_object_params
      params.require(:memory_object).permit(:name, :number, :initials, :description, :image_url, :user_id, :chart_id)
    end
end
