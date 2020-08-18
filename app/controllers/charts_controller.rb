class ChartsController < ApplicationController
  before_action :authorize_request, only: :create
  before_action :set_chart, only: [:show, :update, :destroy]

  # GET /charts
  def index
    @charts = Chart.all

    render json: @charts
  end

  # GET /charts/1
  def show
    render json: @chart
  end

  # POST /charts
  def create
    @chart = Chart.new(chart_params)
    @chart.user = @current_user

    if @chart.save
      render json: @chart, status: :created, location: @chart
    else
      render json: @chart.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /charts/1
  def update
    if @chart.update(chart_params)
      render json: @chart
    else
      render json: @chart.errors, status: :unprocessable_entity
    end
  end

  def add_object
    @chart = Chart.find(params[:id])
    @memory_object = MemoryObject.where(params[:chart_id])

    @chart.memory_objects << @memory_object

    render json: @chart, include: :memory_object 
  end

  # DELETE /charts/1
  def destroy
    @chart.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_chart
      @chart = Chart.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def chart_params
      params.require(:chart).permit(:name, :description, :image_url)
    end
end
